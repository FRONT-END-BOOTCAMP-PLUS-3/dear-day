import { PrismaClient, Event } from "@prisma/client";
import { EventRepository } from "@/domain/repositories/EventRepository";
import { CreateEventRequestDto } from "@/application/usecases/event/dto/CreateEventRequestDto";
import { VisitedEventDto } from "@/application/usecases/mypage/dto/VisitedEventDto";

const prisma = new PrismaClient();

export class PgEventRepository implements EventRepository {
  async createEvent(event: CreateEventRequestDto): Promise<number> {
    try {
      const newEvent = await prisma.event.create({
        data: {
          userId: event.userId,
          starId: event.starId,
          placeName: event.placeName,
          address: event.address,
          latitude: event.latitude,
          longitude: event.longitude,
          title: event.title,
          twitterId: event.twitterId ?? null,
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate),
          startTime: event.startTime,
          endTime: event.endTime,
          countLike: 0,
          mainImage: event.mainImage.startsWith("blob:") ? "" : event.mainImage,
          detailImage: event.detailImage.filter(
            (img) => img && !img.startsWith("blob:")
          ),
          benefits: event.benefits,
          mode: event.mode,
        },
      });

      return newEvent.id;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 [REPOSITORY] Prisma 이벤트 저장 중 오류:", error);
      }
      throw error; // 에러를 그대로 throw해서 Usecase에서 처리할 수 있도록 함
    }
  }

  // 이벤트 아이디로 이벤트 찾기
  async findEventByEventId(eventId: number): Promise<Event | null> {
    try {
      return await prisma.event.findUnique({
        where: { id: eventId },
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 이벤트 조회 중 오류 발생:", error);
      }
      throw new Error("이벤트를 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async findEventsByStartDate(startDate: Date): Promise<Event[]> {
    try {
      return (
        (await prisma.event.findMany({
          where: {
            startDate: {
              gte: startDate,
            },
          },
          orderBy: {
            startDate: "asc",
          },
          take: 10,
        })) || []
      );
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 다가오는 이벤트 불러오는 중 오류 발생:", error);
      }
      throw new Error("다가오는 이벤트를 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async findAll(): Promise<Event[]> {
    try {
      const events = await prisma.event.findMany();
      return events;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findAllEventListByStarId(starId: number): Promise<Event[]> {
    try {
      const events = await prisma.event.findMany({
        where: {
          starId: starId,
        },
      });
      return events;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 이벤트 조회 중 오류 발생:", error);
      }
      throw new Error("이벤트를 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async findAllEventsByUserId(userId: string): Promise<Event[]> {
    try {
      const events = await prisma.event.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          startDate: "asc",
        },
      });
      return events;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 사용자의 이벤트 불러오는 중 오류 발생:", error);
      }
      throw new Error("사용자의 이벤트를 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }
  async findVisitedEventsByUserId(userId: string): Promise<VisitedEventDto[]> {
    try {
      const waitingEvents = await prisma.waiting.findMany({
        where: { userId, status: "ENTERED" },
        select: {
          eventId: true,
          updatedAt: true,
          event: {
            select: {
              id: true,
              title: true,
              address: true,
              mainImage: true,
              star: { select: { stageName: true } },
            },
          },
        },
      });

      const reservationEvents = await prisma.reservation.findMany({
        where: { userId, status: "ENTERED" },
        select: {
          eventId: true,
          reservationConfirmedAt: true,
          event: {
            select: {
              id: true,
              title: true,
              address: true,
              mainImage: true,
              star: { select: { stageName: true } },
            },
          },
        },
      });

      const allVisitedEvents = [
        ...waitingEvents.map((waiting) => ({
          eventId: waiting.eventId,
          mainImage: waiting.event.mainImage,
          title: waiting.event.title,
          stageName: waiting.event.star.stageName,
          address: waiting.event.address,
          date: waiting.updatedAt,
        })),
        ...reservationEvents.map((reservation) => ({
          eventId: reservation.eventId,
          mainImage: reservation.event.mainImage,
          title: reservation.event.title,
          stageName: reservation.event.star.stageName,
          address: reservation.event.address,
          date: reservation.reservationConfirmedAt,
        })),
      ];

      // 최신 날짜순 정렬
      allVisitedEvents.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      return allVisitedEvents;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "🚨 사용자의 방문한 이벤트 불러오는 중 오류 발생:",
          error
        );
      }
      throw new Error("방문한 이벤트를 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateEventByEventId(
    eventId: number,
    data: Partial<Event>
  ): Promise<boolean> {
    try {
      const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: {
          ...data,
        },
      });

      return !!updatedEvent;
    } catch (error) {
      console.error("이벤트 수정 중 오류 발생:", error);
      throw new Error("이벤트를 수정하는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }
}
