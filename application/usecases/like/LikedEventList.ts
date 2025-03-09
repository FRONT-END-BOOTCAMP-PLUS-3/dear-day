import { StarRepository } from "@/domain/repositories/StarRepository";
import { LikedEventRepository } from "@/domain/repositories/LikedEventsRepository";
import { LikedEventDto } from "./dto/LikedEventDto";
import { EventRepository } from "@/domain/repositories/EventRepository";

export const LikedEventListUsecase = async (
  userId: string,
  starRepository: StarRepository,
  likedEventRepository: LikedEventRepository,
  eventRepository: EventRepository
): Promise<(LikedEventDto | null)[]> => {
  const likedEvents = await likedEventRepository.findAll(userId);

  const updatedLikedEvents = await Promise.all(
    likedEvents.map(async (event) => {
      const eventData = await eventRepository.findEventByEventId(event.eventId);

      if (!eventData?.starId) {
        return null;
      }

      const starName = await starRepository.findStarByStarId(eventData.starId);
      if (!starName?.realName) {
        return null;
      }

      return {
        id: eventData.id,
        title: eventData.title,
        address: eventData.address,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        mainImage: eventData.mainImage,
        starName: starName.stageName,
      };
    })
  );

  return updatedLikedEvents;
};
