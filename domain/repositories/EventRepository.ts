import { Event } from "@prisma/client";

export interface EventRepository {
  findEventByEventId(eventId: number): Promise<Event | null>; // 아이디로 이벤트 찾는 메서드
  findEventsByStartDate(startDate: Date): Promise<Event[]>; // 다가오는 이벤트
  findAll(): Promise<Event[]>;
}
