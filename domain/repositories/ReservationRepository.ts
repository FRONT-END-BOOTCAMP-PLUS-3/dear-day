import { Reservation } from "@prisma/client";

export interface ReservationRepository {
  findAllReservationsByEventId(eventId: number): Promise<Reservation[]>; // 이벤트 아이디로 예약명단 찾는 메서드
  createReservation(reservation: Reservation): Promise<void>; // 예약 정보 전송하는 메서드
}
