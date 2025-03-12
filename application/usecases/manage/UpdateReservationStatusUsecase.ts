import { ReservationRepository } from "@/domain/repositories/ReservationRepository";
import { UpdateReservationStatusDto } from "./dto/UpdateReservationStatusDto";

export const updateReservationStatusUsecase = async (
  reservationId: number,
  status: string,
  reservationRepository: ReservationRepository
): Promise<UpdateReservationStatusDto> => {
  const updateReservation =
    await reservationRepository.updateReservationByReservationId(
      reservationId,
      status
    );

  if (!updateReservation) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    updatedReservation: {
      id: reservationId,
      status: status,
    },
  };
};
