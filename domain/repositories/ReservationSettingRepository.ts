import { ReservationSetting } from "@prisma/client";

export interface ReservationSettingRepository {
  findReservationSettingByReservationId(
    reservationId: number
  ): Promise<ReservationSetting | null>; // 이벤트 아이디로 예약설정 찾는 메서드
}
