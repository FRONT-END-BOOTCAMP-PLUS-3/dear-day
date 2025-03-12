import { EventRepository } from "@/domain/repositories/EventRepository";
import { ReservationRepository } from "@/domain/repositories/ReservationRepository";
import { showReservationListDto } from "./dto/ShowReservationListDto";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { WaitingRepository } from "@/domain/repositories/WaitingRepository";
import { showWaitingListDto } from "./dto/ShowWaitingListDto";

export const showParticipantListUsecase = async (
  eventId: number,
  eventRepository: EventRepository,
  reservationRpository: ReservationRepository,
  waitingrepository: WaitingRepository,
  userRepository: UserRepository
): Promise<showReservationListDto | showWaitingListDto> => {
  const event = await eventRepository.findEventByEventId(eventId);
  if (!event) {
    throw new Error("해당하는 이벤트가 없습니다");
  }

  if (event.mode === "RESERVATION") {
    const reservations =
      await reservationRpository.findAllReservationsByEventId(eventId);
    const reservationList = await Promise.all(
      reservations.map(async (reservation) => {
        const user = await userRepository.findUserByUserId(reservation.userId);
        if (!user) {
          throw new Error("해당하는 사용자가 없습니다");
        }
        return {
          id: reservation.id,
          userId: user.id,
          name: user.username,
          email: user.email,
          confirmedAt: reservation.reservationConfirmedAt,
          status: reservation.status,
        };
      })
    );

    reservationList.sort(
      (a, b) =>
        new Date(a.confirmedAt).getTime() - new Date(b.confirmedAt).getTime()
    );

    return {
      title: event.title,
      mainImg: event.mainImage,
      address: event.address,
      startDate: event.startDate,
      endDate: event.endDate,
      mode: event.mode,
      startTime: event.startTime,
      endTime: event.endTime,
      reservationList: reservationList,
    } as showReservationListDto;
  }

  if (event.mode === "WAITING") {
    const waitings = await waitingrepository.findAllWaitingsByEventId(eventId);
    const waitingList = await Promise.all(
      waitings.map(async (waiting) => {
        const user = await userRepository.findUserByUserId(waiting.userId);
        if (!user) {
          throw new Error("해당하는 사용자가 없습니다");
        }
        return {
          id: waiting.id,
          userId: user.id,
          name: user.username,
          email: user.email,
          waitingNumber: waiting.waitingNumber,
          headCount: waiting.headCount,
          confirmedAt: waiting.createdAt,
          status: waiting.status,
        };
      })
    );

    waitingList.sort(
      (a, b) =>
        new Date(a.confirmedAt).getTime() - new Date(b.confirmedAt).getTime()
    );

    return {
      title: event.title,
      mainImg: event.mainImage,
      address: event.address,
      startDate: event.startDate,
      endDate: event.endDate,
      mode: event.mode,
      waitingList: waitingList,
    } as showWaitingListDto;
  }

  throw new Error("잘못된 이벤트 모드입니다");
};
