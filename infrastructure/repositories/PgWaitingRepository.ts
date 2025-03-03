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
}
