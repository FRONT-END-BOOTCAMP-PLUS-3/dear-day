import { ReservationRepository } from "@/domain/repositories/ReservationRepository";
import { MakeReservationDto } from "./dto/MakeReservationDto";
import { Reservation } from "@prisma/client";
import { ReservationSettingRepository } from "@/domain/repositories/ReservationSettingRepository";

export class ReservationLimitExceededError extends Error {
  constructor() {
    super("예약 가능 인원을 초과했습니다.");
    this.name = "ReservationLimitExceededError";
  }
}

export const MakeReservation = async (
  data: MakeReservationDto,
  reservationRepository: ReservationRepository,
  reservationSettingRepository: ReservationSettingRepository
): Promise<void> => {
  const reservationConfirmedAt = new Date(
    `${data.selectedDate}T${data.selectedTime}:00`
  );

  // ✅ 비동기 호출을 `await`로 처리
  const reservationSetting =
    await reservationSettingRepository.findReservationSettingByEventId(
      data.eventId
    );

  const reservations = await reservationRepository.findAllReservationsByEventId(
    data.eventId
  );

  // ✅ 동일한 `reservationConfirmedAt`을 가진 예약 개수 계산
  const existingReservations = reservations.filter(
    (res) =>
      res.reservationConfirmedAt.getTime() === reservationConfirmedAt.getTime()
  );

  // 예약 인원이 다 찼을 경우
  if (existingReservations.length >= reservationSetting!.limit) {
    throw new ReservationLimitExceededError();
  }

  const reservationData: Reservation = {
    id: 0,
    eventId: data.eventId,
    userId: data.userId,
    reservationConfirmedAt,
    status: "CONFIRMED",
    createdAt: new Date(),
  };

  await reservationRepository.createReservation(reservationData);
};
