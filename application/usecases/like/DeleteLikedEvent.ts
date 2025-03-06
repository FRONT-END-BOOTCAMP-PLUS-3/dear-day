import { LikedEventRepository } from "@/domain/repositories/LikedEventsRepository";

export const deleteLikedEventUsecase = async (
  eventId: number,
  userId: string,
  likedEventRepository: LikedEventRepository
): Promise<void> => {
  await likedEventRepository.deleteLikedEventByEventId(eventId, userId);
};
