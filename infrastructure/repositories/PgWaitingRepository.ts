import { PrismaClient, Waiting } from "@prisma/client";
import { WaitingRepository } from "@/domain/repositories/WaitingRepository";

const prisma = new PrismaClient();

export class PgWaitingRepository implements WaitingRepository {
  // 이벤트 ID로 대기 명단 조회
  async findAllWaitingsByEventId(eventId: number): Promise<Waiting[]> {
    try {
      return await prisma.waiting.findMany({
        where: { eventId },
      });
    } catch (error) {
      console.error("대기 명단 조회 중 오류 발생:", error);
      throw new Error("대기 명단을 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect(); // DB 연결 해제
    }
  }

  // 대기 정보 전송하는 메서드
  async createWaiting(waiting: Waiting): Promise<void> {
    try {
      await prisma.waiting.create({
        data: {
          eventId: waiting.eventId,
          userId: waiting.userId,
          waitingNumber: waiting.waitingNumber,
          headCount: waiting.headCount,
        },
      });
    } finally {
      await prisma.$disconnect();
    }
  }
}
