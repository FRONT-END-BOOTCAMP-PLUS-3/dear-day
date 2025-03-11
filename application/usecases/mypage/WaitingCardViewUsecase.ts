import { WaitingRepository } from "@/domain/repositories/WaitingRepository";
import { WaitingCardViewDto } from "./dto/WaitingCardViewDto";

export const waitingCardViewUsecase = async (
  userId: string,
  waitingRepo: WaitingRepository
): Promise<WaitingCardViewDto[]> => {
  return await waitingRepo.findAllWaitingByUserId(userId);
};
