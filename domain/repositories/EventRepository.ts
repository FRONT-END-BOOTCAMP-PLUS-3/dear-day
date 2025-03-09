import { CreateEventRequestDto } from "@/application/usecases/event/dto/CreateEventRequestDto";
import { Event } from "@prisma/client";

export interface EventRepository {
  createEvent(event: CreateEventRequestDto): Promise<number>; // 생카 정보 등록하는 메서드
  findEventByEventId(eventId: number): Promise<Event | null>; // 아이디로 이벤트 찾는 메서드
  findEventsByStartDate(startDate: Date): Promise<Event[]>; // 다가오는 이벤트
  findAll(): Promise<Event[]>;
  findAllEventListByStarId(starId: number): Promise<Event[]>;
  findAllEventsByUserId(userId: string): Promise<Event[]>; // 사용자의 이벤트 조회
}
