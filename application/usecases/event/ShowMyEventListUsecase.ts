import { EventRepository } from "@/domain/repositories/EventRepository";
import { showMyEventListDto } from "./dto/ShowMyEventListDto";
import { StarRepository } from "@/domain/repositories/StarRepository";

enum EventStatus {
  UPCOMING = "예정",
  ONGOING = "진행중",
  ENDED = "종료",
}

export const showMyEventListUsecase = async (
  userId: string,
  eventRepository: EventRepository,
  starRepository: StarRepository
): Promise<showMyEventListDto[]> => {
  const events = await eventRepository.findAllEventsByUserId(userId);

  const formattedDate = (date: Date, time: string): Date => {
    const mergedDate = new Date(date.getTime() - 9 * 60 * 60 * 1000);
    const [hours, minutes] = time.split(":").map(Number);

    mergedDate.setUTCHours(hours, minutes, 0, 0);
    return mergedDate;
  };

  const today = new Date();
  const getEventStatus = (
    today: Date,
    openDate: Date,
    endDate: Date
  ): EventStatus => {
    return today < openDate
      ? EventStatus.UPCOMING
      : today > endDate
        ? EventStatus.ENDED
        : EventStatus.ONGOING;
  };

  const eventsWithStars = await Promise.all(
    events.map(async (event) => {
      const star = await starRepository.findStarByStarId(event.starId);

      const openDate = formattedDate(event.startDate, event.startTime);
      const endDate = formattedDate(event.endDate, event.endTime);

      const status = getEventStatus(today, openDate, endDate);

      return {
        id: event.id,
        title: event.title,
        mainImage: event.mainImage,
        starName: star?.stageName || "unknown",
        address: event.address,
        startDate: openDate,
        endDate: endDate,
        status: status,
      };
    })
  );

  return eventsWithStars;
};
