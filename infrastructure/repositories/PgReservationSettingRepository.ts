import { PrismaClient, ReservationSetting } from "@prisma/client";
import { ReservationSettingRepository } from "@/domain/repositories/ReservationSettingRepository";

const prisma = new PrismaClient();

export class PgReservationSettingRepository
  implements ReservationSettingRepository
{
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
}
