import { HeadCountDto } from "@/application/usecases/ticket/dto/HeadCountDto";
import { WaitingCardViewDto } from "@/application/usecases/mypage/dto/WaitingCardViewDto";
import { Waiting } from "@prisma/client";

export interface WaitingRepository {
  findAllWaitingsByEventId(eventId: number): Promise<Waiting[]>; // 이벤트 아이디로 예약명단 불러오는 메서드
  createWaiting(waiting: Waiting): Promise<void>; // 대기 정보 전송하는 메서드
  findWaitingTicket(eventId: number, userId: string): Promise<HeadCountDto>;
  deleteWaiting(eventId: number, userId: string): Promise<void>; // 대기 취소하는 메서드
  findAllWaitingByUserId(userId: string): Promise<WaitingCardViewDto[]>;
  updateWaitingByWaitingId(waitingId: number, status: string): Promise<boolean>; // 대기 상태 변경하는 메서드
}
