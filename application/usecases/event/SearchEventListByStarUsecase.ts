import { EventRepository } from "@/domain/repositories/EventRepository";
import { searchEventListByStarDto } from "./dto/SearchEventListByStarDto";
import { StarRepository } from "@/domain/repositories/StarRepository";

export const searchEventListByStarUsecase = async (
  starId: number,
  eventRepository: EventRepository,
  starRepository: StarRepository
): Promise<searchEventListByStarDto[]> => {
  const events = await eventRepository.findAllEventListByStarId(starId);
  const star = await starRepository.findStarByStarId(starId);

  if (!star) {
    throw new Error(`Star with ID ${starId} not found`); // star에 null이 있을 때를 방지
  }

  return events.map((event) => ({
    id: event.id,
    imgSrc: event.mainImage,
    title: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    starName: star.stageName,
    address: event.address,
  }));
};
