import { EventRepository } from "@/domain/repositories/EventRepository";
import { ShowEventListDto } from "./dto/ShowEventListDto";
import { StarRepository } from "@/domain/repositories/StarRepository";

export const ShowEventList = async (
  eventRepository: EventRepository,
  starRepository: StarRepository
): Promise<ShowEventListDto[]> => {
  // 모든 이벤트 데이터 조회
  const events = await eventRepository.findAll();

  const eventsInfo = await Promise.all(
    events.map(async (event) => {
      const star = await starRepository.findStarByStarId(event.starId);

      return {
        id: event.id,
        mainImage: event.mainImage,
        title: event.title,
        startDate: event.startDate,
        endDate: event.endDate,
        starId: event.starId,
        stageName: star?.stageName || "알 수 없음",
        group: star?.group,
        address: event.address,
        latitude: event.latitude,
        longitude: event.longitude,
      };
    })
  );

  return eventsInfo;
};
