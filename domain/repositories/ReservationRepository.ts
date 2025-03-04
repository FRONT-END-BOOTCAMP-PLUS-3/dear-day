import { Reservation } from "@prisma/client";

export interface ReservationRepository {
  findAllReservationsByEventId(eventId: number): Promise<Reservation[]>; // 이벤트 아이디로 예약명단 찾는 메서드
}
