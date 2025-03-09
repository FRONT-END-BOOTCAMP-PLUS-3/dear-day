import { ReservationRepository } from "@/domain/repositories/ReservationRepository";
import { WaitingRepository } from "@/domain/repositories/WaitingRepository";

export const deleteReservationUsecase = async (
  eventId: number,
  userId: string,
  reservationRepo: ReservationRepository
) => {
  await reservationRepo.deleteReservation(eventId, userId);
};

export const deleteWaitingUsecase = async (
  eventId: number,
  userId: string,
  waitingRepo: WaitingRepository
) => {
  await waitingRepo.deleteWaiting(eventId, userId);
};
