import { LikedEvent } from "@prisma/client";

export interface LikedEventRepository {
  findAll(userId: string): Promise<LikedEvent[]>;
  findLikedEventByEventId(
    eventId: number,
    userId: string
  ): Promise<LikedEvent | false>;
  createLikedEvent(eventId: number, userId: string): Promise<LikedEvent>;
  deleteLikedEventByEventId(eventId: number, userId: string): Promise<void>;
}
