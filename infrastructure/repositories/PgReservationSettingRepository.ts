import { PrismaClient, ReservationSetting } from "@prisma/client";
import { ReservationSettingRepository } from "@/domain/repositories/ReservationSettingRepository";
import { CreateReservationSettingRequestDto } from "@/application/usecases/event/dto/CreateReservationSettingRequestDto";

const prisma = new PrismaClient();

export class PgReservationSettingRepository
  implements ReservationSettingRepository
{
  async createReservationSetting(
    reservationData: CreateReservationSettingRequestDto
  ): Promise<void> {
    await prisma.reservationSetting.create({
      data: {
        eventId: reservationData.eventId, // event 테이블과의 FK
        openAt: reservationData.openAt,
        breaktime: reservationData.breaktime,
        limit: reservationData.limit,
      },
    });
  }
  // 예약 ID로 예약 설정 조회
  async findReservationSettingByEventId(
    eventId: number
  ): Promise<ReservationSetting | null> {
    try {
      return await prisma.reservationSetting.findFirst({
        where: { eventId },
      });
    } catch (error) {
      console.error("예약 설정 조회 중 오류 발생:", error);
      throw new Error("예약 설정을 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateReservationSettingByEventId(
    eventId: number,
    data: Partial<ReservationSetting>
  ): Promise<boolean> {
    try {
      const reservationId = await prisma.reservationSetting.findFirst({
        where: { eventId },
      });

      if (!reservationId) {
        return false;
      }

      await prisma.reservationSetting.update({
        where: { id: reservationId.id },
        data,
      });

      return true;
    } catch (error) {
      console.error("예약 설정 업데이트 중 오류 발생:", error);
      return false;
    } finally {
      await prisma.$disconnect();
    }
  }
}
