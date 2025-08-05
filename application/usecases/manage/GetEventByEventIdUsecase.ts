import { EventRepository } from "@/domain/repositories/EventRepository";
import { GetEventByEventIdDto } from "./dto/GetEventByEventIdDto";
import { ReservationSettingRepository } from "@/domain/repositories/ReservationSettingRepository";

export const getEventByEventIdUsecase = async (
  eventId: number,
  eventRepository: EventRepository,
  reservationSettingRepository: ReservationSettingRepository
): Promise<GetEventByEventIdDto> => {
  const event = await eventRepository.findEventByEventId(eventId);
  const reservationSetting =
    await reservationSettingRepository.findReservationSettingByEventId(eventId);
  if (!event) {
    throw new Error("이벤트를 찾을 수 없습니다.");
  }

  return {
    eventDetail: {
      placeName: event.placeName,
      address: event.address,
      latitude: event.latitude,
      longitude: event.longitude,
      startDate: event.startDate,
      endDate: event.endDate,
      title: event.title,
      twitterId: event.twitterId || "",

      mode: event.mode,
      startTime: event.startTime,
      endTime: event.endTime,
      openAt: reservationSetting?.openAt ?? new Date(),
      breaktime: reservationSetting?.breaktime ?? 0,
      limit: reservationSetting?.limit ?? 0,

      mainImage: event.mainImage,
      detailImage: event.detailImage,
      benefits: event.benefits,
    },
  };
};
