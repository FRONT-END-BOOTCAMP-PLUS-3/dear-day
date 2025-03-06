import { ReservationRepository } from "@/domain/repositories/ReservationRepository";
import { MakeReservationDto } from "./dto/MakeReservationDto";
import { Reservation } from "@prisma/client";

export const MakeReservation = async (
  data: MakeReservationDto,
  reservationRepository: ReservationRepository
): Promise<void> => {
  const reservationConfirmedAt = new Date(
    `${data.selectedDate}T${data.selectedTime}:00`
  );

  const reservationData: Reservation = {
    id: 0,
    eventId: data.eventId,
    userId: data.userId,
    reservationConfirmedAt,
    status: "CONFIRMED",
    createdAt: new Date(),
  };
  reservationRepository.createReservation(reservationData);
};
