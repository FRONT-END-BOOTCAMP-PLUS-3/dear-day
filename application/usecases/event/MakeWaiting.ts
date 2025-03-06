import { WaitingRepository } from "@/domain/repositories/WaitingRepository";
import { Waiting } from "@prisma/client";
import { MakeWaitingDto } from "./dto/MakeWaitingDto";

export const MakeWaiting = async (
  data: MakeWaitingDto,
  waitingRepository: WaitingRepository
): Promise<void> => {
  // 오늘 날짜와 일치하는 대기명단만 필터링
  const today = new Date().toISOString().split("T")[0];
  const allWaitings = await waitingRepository.findAllWaitingsByEventId(
    data.eventId
  );
  const todayWaitings = allWaitings.filter(
    (waiting) =>
      new Date(waiting.createdAt).toISOString().split("T")[0] === today
  );

  const waitingNumber = todayWaitings.length + 1; // 오늘 날짜의 대기명단 개수 + 1 = 대기번호

  const waitingData: Waiting = {
    id: 0,
    eventId: data.eventId,
    userId: data.userId,
    waitingNumber,
    headCount: data.headCount,
    status: "PENDING",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  waitingRepository.createWaiting(waitingData);
};
