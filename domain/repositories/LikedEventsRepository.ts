import { LikedEvent } from "@prisma/client";

export interface LikedEventRepository {
  findLikedEventByEventId(eventId: number, userId: string): Promise<LikedEvent>;
  createLikedEvent(eventId: number, userId: string): Promise<LikedEvent>;
  deleteLikedEventByEventId(eventId: number, userId: string): Promise<void>;
}
