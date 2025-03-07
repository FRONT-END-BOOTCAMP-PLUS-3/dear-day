import { EventRepository } from "@/domain/repositories/EventRepository";
import { ReservationTicketDto } from "./dto/ReservationTicketDto";
import { WaitingTicketDto } from "./dto/WaitingTicketDto";
import { ReservationRepository } from "@/domain/repositories/ReservationRepository";
import { ReservationSettingRepository } from "@/domain/repositories/ReservationSettingRepository";
import { WaitingRepository } from "@/domain/repositories/WaitingRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";

export const ticketUsecase = async (
  eventId: number,
  userId: string,
  userRepo: UserRepository,
  eventRepo: EventRepository,
  reservationRepo: ReservationRepository,
  reservationSettingRepo: ReservationSettingRepository,
  waitingRepo: WaitingRepository
): Promise<ReservationTicketDto | WaitingTicketDto | null> => {
  const user = await userRepo.findUserInfo(userId);
  // 1. 이벤트 조회
  const event = await eventRepo.findEventByEventId(eventId);
  if (!event) return null;

  if (event.mode === "RESERVATION") {
    // 2. 예약 정보 조회
    const reservation = await reservationRepo.findReservationTime(
      eventId,
      userId
    );
    const setting =
      await reservationSettingRepo.findReservationSettingByEventId(eventId);

    return {
      eventId,
      userId,
      title: event.title,
      mainImage: event.mainImage,
      address: event.address,
      email: user.email,
      reservationConfirmedAt: reservation.reservationConfirmedAt,
      breaktime: setting?.breaktime || 0,
    };
  } else if (event.mode === "WAITING") {
    // 3. 대기 정보 조회
    const waiting = await waitingRepo.findWaitingTicket(eventId, userId);
    if (!waiting) return null;

    return {
      eventId,
      userId,
      waitingId: waiting.id,
      mainImage: event.mainImage,
      title: event.title,
      address: event.address,
      email: user.email,
      headCount: waiting.headCount,
    };
  }
  return null;
};
