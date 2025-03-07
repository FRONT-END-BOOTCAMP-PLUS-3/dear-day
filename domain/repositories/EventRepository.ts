import { Event } from "@prisma/client";

export interface EventRepository {
  findEventByEventId(eventId: number): Promise<Event | null>; // 아이디로 이벤트 찾는 메서드
  findAllEventListByStarId(starId: number): Promise<Event[]>;
}
