import { PrismaClient, Reservation } from "@prisma/client";
import { ReservationRepository } from "@/domain/repositories/ReservationRepository";
import { ReservationConfirmedAtDto } from "@/application/usecases/ticket/dto/ReservationConfirmedAtDto";
import { ReservationCardViewDto } from "@/application/usecases/mypage/dto/ReservationCardViewDto";

const prisma = new PrismaClient();

export class PgReservationRepository implements ReservationRepository {
  async findAllReservationByUserId(
    userId: string
  ): Promise<ReservationCardViewDto[]> {
    const reservations = await prisma.reservation.findMany({
      where: { userId, status: "CONFIRMED" },
      include: {
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

    return reservations.map((reservation) => ({
      mode: "RESERVATION",
      eventId: reservation.eventId,
      userId: reservation.userId,
      mainImage: reservation.event.mainImage,
      title: reservation.event.title,
      stageName: reservation.event.star.stageName,
      address: reservation.event.address,
      reservationConfirmedAt: reservation.reservationConfirmedAt.toISOString(),
    }));
  }

  async deleteReservation(eventId: number, userId: string): Promise<void> {
    const deleted = await prisma.reservation.deleteMany({
      where: { eventId, userId },
    });

    if (deleted.count === 0) {
      throw new Error("해당 예약이 존재하지 않습니다.");
    }
  }

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
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 예약시간 조회 중 오류 발생:", error);
      }
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
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 예약 조회 중 오류 발생:", error);
      }
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

  async updateReservationByReservationId(
    reservationId: number,
    status: string
  ): Promise<boolean> {
    try {
      const updated = await prisma.reservation.update({
        where: { id: reservationId },
        data: { status },
      });

      return !!updated;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 예약 상태 변경 중 오류 발생:", error);
      }
      throw new Error("예약 상태 변경 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }
}
