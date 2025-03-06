import { Waiting } from "@prisma/client";

export interface WaitingRepository {
  findAllWaitingsByEventId(eventId: number): Promise<Waiting[]>; // 이벤트 아이디로 예약명단 불러오는 메서드
  createWaiting(waiting: Waiting): Promise<void>; // 대기 정보 전송하는 메서드
}
