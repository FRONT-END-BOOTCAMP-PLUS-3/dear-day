import { EventRepository } from "@/domain/repositories/EventRepository";
import { VisitedEventDto } from "./dto/VisitedEventDto";

export const visitedEventUsecase = async (
  userId: string,
  eventRepository: EventRepository
): Promise<VisitedEventDto[]> => {
  const events = await eventRepository.findVisitedEventsByUserId(userId);
  return events;
};
