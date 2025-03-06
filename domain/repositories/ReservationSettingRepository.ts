import { CreateReservationSettingRequestDto } from "@/application/usecases/event/dto/CreateReservationSettingRequestDto";
import { ReservationSetting } from "@prisma/client";

export interface ReservationSettingRepository {
  createReservationSetting(
    reservationSetting: CreateReservationSettingRequestDto
  ): Promise<void>; // // 생카 모드가 RESERVATION 일 때 등록하는 메서드
  findReservationSettingByEventId(
    eventId: number
  ): Promise<ReservationSetting | null>; // 이벤트 아이디로 예약설정 찾는 메서드
}
