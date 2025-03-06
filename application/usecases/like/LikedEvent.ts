import { LikedEventRepository } from "@/domain/repositories/LikedEventsRepository";
import { LikedEventDto } from "./dto/LikedEventDto";

export const LikedEventUsecase = async (
  eventId: number,
  userId: string,
  likedEventRepository: LikedEventRepository
): Promise<LikedEventDto | false> => {
  const likedEvent = await likedEventRepository.findLikedEventByEventId(
    eventId,
    userId
  );

  if (!likedEvent) {
    return false;
  }

  return { eventId: likedEvent.eventId };
};
