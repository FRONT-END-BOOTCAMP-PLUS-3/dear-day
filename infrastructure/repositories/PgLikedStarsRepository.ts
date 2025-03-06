import { LikedStarsRepository } from "@/domain/repositories/LikedStarsRepository";
import { LikedStar, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PgLikedStarsRepository implements LikedStarsRepository {
  async findLikedStarsByUserId(userId: string): Promise<LikedStar[]> {
    try {
      const likedStars = await prisma.likedStar.findMany({
        where: { userId },
      });

      return likedStars;
    } catch (error) {
      console.error(
        "좋아요한 스타 조회 중 오류 발생:",
        error instanceof Error ? error.stack : error
      );
      throw new Error(
        `좋아요한 스타를 불러오는 중 오류가 발생했습니다. Details: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }
}
