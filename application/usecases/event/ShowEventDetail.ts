import { EventRepository } from "@/domain/repositories/EventRepository";
import { ReservationRepository } from "@/domain/repositories/ReservationRepository";
import { ReservationSettingRepository } from "@/domain/repositories/ReservationSettingRepository";
import { StarRepository } from "@/domain/repositories/StarRepository";
import { WaitingRepository } from "@/domain/repositories/WaitingRepository";
import { ShowEventDetailDto } from "./dto/ShowEventDetailDto";

export const ShowEventDetail = async (
  eventId: number,
  userId: string,
  eventRepository: EventRepository,
  starRepository: StarRepository,
  reservationSettingRepository: ReservationSettingRepository,
  reservationRepository: ReservationRepository,
  waitingRepository: WaitingRepository
): Promise<ShowEventDetailDto> => {
  // 1. 이벤트  상세 가져오기
  const event = await eventRepository.findEventByEventId(eventId);

  if (!event) {
    throw new Error("이벤트를 찾을 수 없습니다."); // 예외 발생
  }

  // 2. 스타 정보 조회
  const star = await starRepository.findStarByStarId(event.starId);

  // 3. 예약 설정 정보 조회 (RESERVATION 모드일 경우)
  let reservationSetting;
  if (event.mode === "RESERVATION") {
    reservationSetting =
      await reservationSettingRepository.findReservationSettingByEventId(
        eventId
      );
  }

  // 4. 예약 현황 확인 (RESERVATION 모드일 경우)
  let hasReservation = false;
  if (event.mode === "RESERVATION") {
    const reservations =
      await reservationRepository.findAllReservationsByEventId(eventId);
    hasReservation = reservations.some((res) => res.userId === userId);
  }

  // 5. 대기 현황 확인 (WAITING 모드일 경우)
  let hasWaiting = false;
  if (event.mode === "WAITING") {
    const waitings = await waitingRepository.findAllWaitingsByEventId(eventId);
    hasWaiting = waitings.some((wait) => wait.userId === userId);
  }

  // 6. DTO 변환 및 반환
  return {
    id: event.id,
    starName: star
      ? `${star.stageName}${star.group ? ` (${star.group})` : ""}`
      : "Unknown Star",
    startDate: event.startDate,
    endDate: event.endDate,
    startTime: event.startTime,
    endTime: event.endTime,
    title: event.title,
    twitterId: event.twitterId || " ",
    mainImage: event.mainImage,
    detailImage: event.detailImage,
    benefits: event.benefits,
    address: event.address,
    latitude: event.latitude,
    longitude: event.longitude,
    mode: event.mode,

    // RESERVATION 모드 관련 필드
    openAt: reservationSetting?.openAt,
    breaktime: reservationSetting?.breaktime,
    limit: reservationSetting?.limit,
    hasReservation,

    // WAITING 모드 관련 필드
    hasWaiting,
  };
};
