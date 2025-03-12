import { WaitingRepository } from "@/domain/repositories/WaitingRepository";
import { UpdateWaitingStatusDto } from "./dto/UpdateWaitingStatusDto";

export const updateWaitingStatusUsecase = async (
  waitingId: number,
  status: string,
  waitingRepository: WaitingRepository
): Promise<UpdateWaitingStatusDto> => {
  const updateWaiting = await waitingRepository.updateWaitingByWaitingId(
    waitingId,
    status
  );

  if (!updateWaiting) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    updatedWaiting: {
      id: waitingId,
      status: status,
    },
  };
};
