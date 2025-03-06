import { WaitingRepository } from "@/domain/repositories/WaitingRepository";
import { ShowWaitingCountDto } from "./dto/ShowWaitingCountDto";

export const ShowWaitingCount = async (
  eventId: number,
  waitingRepository: WaitingRepository
): Promise<ShowWaitingCountDto> => {
  const waitings = await waitingRepository.findAllWaitingsByEventId(eventId);

  const pendingWaitings = waitings.filter((e) => e.status == "PENDING");
  return {
    waitingCount: pendingWaitings.length,
  };
};
