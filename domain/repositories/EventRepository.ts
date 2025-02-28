import { Event } from "@prisma/client";

export interface EventRepository {
  findEventById(id: string): Promise<Event | null>; // 아이디로 이벤트 찾는 메서드
}
