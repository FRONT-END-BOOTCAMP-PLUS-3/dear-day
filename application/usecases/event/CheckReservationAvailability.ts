import { ReservationRepository } from "@/domain/repositories/ReservationRepository";
import { CheckReservationAvailabilityDto } from "./dto/CheckReservationAvailabilityDto";

export const CheckReservationAvailabilityUsecase = async (
  eventId: number,
  reservationRepository: ReservationRepository
): Promise<CheckReservationAvailabilityDto> => {
  const reservations =
    await reservationRepository.findAllReservationsByEventId(eventId);

  const reservationConfirmedAtList = reservations
    .filter((reservation) => reservation.reservationConfirmedAt !== null) // null 제거
    .map(
      (reservation) =>
        new Date(reservation.reservationConfirmedAt).toISOString().slice(0, 19) // "YYYY-MM-DDTHH:mm:ss" 형식 변환
    );

  return {
    reservationConfirmedAt: reservationConfirmedAtList,
  };
};
