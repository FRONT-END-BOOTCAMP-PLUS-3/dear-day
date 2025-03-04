import { LikedEventRepository } from "@/domain/repositories/LikedEventsRepository";
import { LikedEventDto } from "./dto/LikedEventDto";

export const LikedEventUsecase = async (
  eventId: number,
  userId: string,
  likedEventRepository: LikedEventRepository
): Promise<LikedEventDto> => {
  const likedEvent = await likedEventRepository.findLikedEventByEventId(
    eventId,
    userId
  );

  return { eventId: likedEvent.eventId };
};
