import { PrismaClient, Event } from "@prisma/client";
import { EventRepository } from "@/domain/repositories/EventRepository";
import { CreateEventRequestDto } from "@/application/usecases/event/dto/CreateEventRequestDto";

const prisma = new PrismaClient();

export class PgEventRepository implements EventRepository {
  async createEvent(event: CreateEventRequestDto): Promise<number> {
    console.log("📌 [REPOSITORY] 저장할 이벤트 데이터:", event); // 🔥 디버깅 추가

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

      console.log("✅ [REPOSITORY] 이벤트 저장 완료! 생성된 ID:", newEvent.id);
      return newEvent.id;
    } catch (error) {
      console.error("🚨 [REPOSITORY] Prisma 이벤트 저장 중 오류:", error); // 🔥 Prisma 에러 출력 추가
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
      console.error("이벤트 조회 중 오류 발생:", error);
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
      console.error("다가오는 이벤트 조회 중 오류 발생:", error);
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
}
