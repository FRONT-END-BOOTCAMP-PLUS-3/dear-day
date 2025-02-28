import { Waiting } from "@prisma/client";

export interface WaitingRepository {
  findAllWaitingsById(id: string): Promise<Waiting[]>; // 이벤트 아이디로 예약명단 불러오는 메서드
}
