import { PrismaClient, Reservation } from "@prisma/client";
import { ReservationRepository } from "@/domain/repositories/ReservationRepository";

const prisma = new PrismaClient();

export class PgReservationRepository implements ReservationRepository {
  // 이벤트 아이디로 예약 목록 조회
  async findAllReservationsByEventId(eventId: number): Promise<Reservation[]> {
    try {
      return await prisma.reservation.findMany({
        where: { eventId },
      });
    } catch (error) {
      console.error("예약 조회 중 오류 발생:", error);
      throw new Error("예약 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }
}
