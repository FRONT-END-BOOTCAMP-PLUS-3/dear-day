import { LikedEventRepository } from "@/domain/repositories/LikedEventsRepository";
import { LikedEvent, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PgLikedEventRepository implements LikedEventRepository {
  async findLikedEventByEventId(
    eventId: number,
    userId: string
  ): Promise<LikedEvent | false> {
    try {
      const likedEvent = await prisma.likedEvent.findUnique({
        where: {
          eventId_userId: {
            eventId,
            userId,
          },
        },
      });
      if (!likedEvent) {
        return false;
      }
      return likedEvent;
    } catch (error) {
      console.error(
        "좋아요한 이벤트 조회 중 오류 발생:",
        error instanceof Error ? error.stack : error
      );
      throw new Error(
        `좋아요한 이벤트를 불러오는 중 오류가 발생했습니다. Details: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }

  async createLikedEvent(eventId: number, userId: string): Promise<LikedEvent> {
    try {
      return await prisma.likedEvent.create({
        data: {
          eventId: eventId,
          userId: userId,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      console.error("좋아요한 이벤트 생성 중 오류 발생:", error);
      throw new Error(
        `좋아요한 이벤트 생성 중 오류가 발생했습니다. Details: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }

  async deleteLikedEventByEventId(
    eventId: number,
    userId: string
  ): Promise<void> {
    try {
      await prisma.likedEvent.delete({
        where: {
          eventId_userId: {
            eventId: eventId,
            userId: userId,
          },
        },
      });
    } catch (error) {
      console.error("좋아요한 이벤트 삭제 중 오류 발생:", error);
      throw new Error(
        `좋아요한 이벤트 삭제 중 오류가 발생했습니다. Details: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }
}
