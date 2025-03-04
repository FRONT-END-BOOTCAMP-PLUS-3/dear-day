import { StarRepository } from "@/domain/repositories/StarRepository";
import { EventRepository } from "@/domain/repositories/EventRepository";
import { ShowUpcomingEventsDto } from "./dto/ShowUpcomingEventsDto";

export const ShowUpcomingEvents = async (
  currentDate: Date,
  eventRepository: EventRepository,
  starRepository: StarRepository
): Promise<ShowUpcomingEventsDto> => {
  const events = await eventRepository.findEventsByStartDate(currentDate);

  if (!events || events.length === 0) {
    throw new Error("이벤트를 찾을 수 없습니다.");
  }

  const upcomingEvents = await Promise.all(
    events.map(async (event) => {
      const star = await starRepository.findStarByStarId(event.starId);

      return {
        id: event.id,
        imgSrc: event.mainImage,
        title: event.title,
        startDate: event.startDate,
        endDate: event.endDate,
        starName: star
          ? `${star.stageName}${star.group ? ` (${star.group})` : ""}`
          : "Unknown Star",
        address: event.address,
      };
    })
  );

  return { ShowUpcomingEvents: upcomingEvents };
};
