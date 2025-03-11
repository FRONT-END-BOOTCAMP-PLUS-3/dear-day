import { ReservationRepository } from "@/domain/repositories/ReservationRepository";
import { ReservationCardViewDto } from "./dto/ReservationCardViewDto";

export const reservationCardViewUsecase = async (
  userId: string,
  reservationRepo: ReservationRepository
): Promise<ReservationCardViewDto[]> => {
  return await reservationRepo.findAllReservationByUserId(userId);
};
