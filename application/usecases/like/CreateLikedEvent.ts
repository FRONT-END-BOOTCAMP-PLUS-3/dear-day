import { LikedEventRepository } from "@/domain/repositories/LikedEventsRepository";
import { LikedEventDto } from "./dto/LikedEventDto";

export const createLikedEventUsecase = async (
  eventId: number,
  userId: string,
  likedEventRepository: LikedEventRepository
): Promise<LikedEventDto> => {
  const likedEvent = await likedEventRepository.createLikedEvent(
    eventId,
    userId
  );

  return { eventId: likedEvent.eventId };
};
