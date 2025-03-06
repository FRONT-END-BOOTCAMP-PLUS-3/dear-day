import { PrismaClient, Event } from "@prisma/client";
import { EventRepository } from "@/domain/repositories/EventRepository";

const prisma = new PrismaClient();

export class PgEventRepository implements EventRepository {
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
