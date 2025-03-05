import { EventRepository } from "@/domain/repositories/EventRepository";
import { ReservationSettingRepository } from "@/domain/repositories/ReservationSettingRepository";
import { CreateEventRequestDto } from "@/application/usecases/event/dto/CreateEventRequestDto";
import { CreateReservationSettingRequestDto } from "@/application/usecases/event/dto/CreateReservationSettingRequestDto";

export class RegisterEventUsecase {
  private eventRepository: EventRepository;
  private reservationSettingRepository: ReservationSettingRepository;

  constructor(
    eventRepo: EventRepository,
    reservationRepo: ReservationSettingRepository
  ) {
    this.eventRepository = eventRepo;
    this.reservationSettingRepository = reservationRepo;
  }

  // `userId`를 포함한 데이터를 받도록 수정
  async execute(
    eventData: (CreateEventRequestDto & CreateReservationSettingRequestDto) & {
      userId: string;
    }
  ): Promise<{ success: boolean; eventId: number }> {
    console.log("📌 [USECASE] 받은 eventData:", eventData);

    // event 테이블에 저장할 데이터 추출
    const eventToSave: CreateEventRequestDto = {
      userId: eventData.userId, // 여기서 userId를 저장
      starId: eventData.starId,
      placeName: eventData.placeName,
      address: eventData.address,
      latitude: eventData.latitude,
      longitude: eventData.longitude,
      title: eventData.title,
      twitterId: eventData.twitterId,
      startDate: new Date(eventData.startDate),
      endDate: new Date(eventData.endDate),
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      mode: eventData.mode,
      mainImage: eventData.mainImage,
      detailImage: eventData.detailImage,
      benefits: eventData.benefits,
    };

    console.log("📌 [USECASE] 저장할 이벤트 데이터:", eventToSave);

    // event 테이블 저장 후 id 반환
    let eventId: number;
    try {
      eventId = await this.eventRepository.createEvent(eventToSave);
      console.log("✅ [USECASE] 이벤트 저장 성공! eventId:", eventId);
    } catch (error) {
      console.error("🚨 [USECASE] 이벤트 저장 중 오류:", error);
      throw new Error("이벤트 저장 실패");
    }

    if (!eventId) {
      console.error("🚨 [USECASE] eventId가 생성되지 않음!");
      throw new Error("이벤트 저장 실패");
    }

    // reservationsetting 테이블에 저장 (mode가 RESERVATION일 때만 실행)
    if (eventData.mode === "RESERVATION") {
      const reservationToSave: CreateReservationSettingRequestDto = {
        eventId, // FK로 eventId 추가
        openAt: new Date(eventData.openAt),
        breaktime: eventData.breaktime,
        limit: eventData.limit,
      };

      console.log("📌 [USECASE] 저장할 예약 데이터:", reservationToSave);

      try {
        await this.reservationSettingRepository.createReservationSetting(
          reservationToSave
        );
        console.log("✅ [USECASE] 예약 설정 저장 성공!");
      } catch (error) {
        console.error("🚨 [USECASE] 예약 설정 저장 중 오류:", error);
        throw new Error("예약 설정 저장 실패");
      }
    }

    return { success: true, eventId };
  }
}
