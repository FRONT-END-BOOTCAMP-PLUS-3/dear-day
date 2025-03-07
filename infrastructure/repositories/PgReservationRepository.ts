import { PrismaClient, Reservation } from "@prisma/client";
import { ReservationRepository } from "@/domain/repositories/ReservationRepository";
import { ReservationConfirmedAtDto } from "@/application/usecases/ticket/dto/ReservationConfirmedAtDto";

const prisma = new PrismaClient();

export class PgReservationRepository implements ReservationRepository {
  async findReservationTime(
    eventId: number,
    userId: string
  ): Promise<ReservationConfirmedAtDto> {
    try {
      const reservation = await prisma.reservation.findFirst({
        where: { eventId, userId },
        select: { reservationConfirmedAt: true },
      });

      return {
        reservationConfirmedAt:
          reservation?.reservationConfirmedAt?.toISOString() || "",
      };
    } catch (error) {
      console.error("예약 시간 조회 중 오류 발생:", error);
      throw new Error("예약 시간을 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }
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
  // 예약 정보 전송하는 메서드
  async createReservation(reservation: Reservation): Promise<void> {
    try {
      await prisma.reservation.create({
        data: {
          eventId: reservation.eventId,
          userId: reservation.userId,
          reservationConfirmedAt: reservation.reservationConfirmedAt,
        },
      });
    } finally {
      await prisma.$disconnect();
    }
  }
}
