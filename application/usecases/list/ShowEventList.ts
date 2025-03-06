import { EventRepository } from "@/domain/repositories/EventRepository";
import { ShowEventListDto } from "./dto/ShowEventListDto";

export const ShowEventList = async (
  eventRepository: EventRepository
): Promise<ShowEventListDto[]> => {
  // 모든 이벤트 데이터 조회
  const events = await eventRepository.findAll();

  const eventsInfo = events.map((event) => ({
    id: event.id,
    mainImage: event.mainImage,
    title: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    starId: event.starId,
    address: event.address,
    latitude: event.latitude,
    longitude: event.longitude,
  }));

  return eventsInfo;
};
