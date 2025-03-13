import { LikedStarsRepository } from "@/domain/repositories/LikedStarsRepository";
import { LikedStar, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PgLikedStarsRepository implements LikedStarsRepository {
  async findLikedStarByStarId(
    starId: number,
    userId: string
  ): Promise<LikedStar | false> {
    try {
      const likedStar = await prisma.likedStar.findUnique({
        where: {
          starId_userId: {
            starId,
            userId,
          },
        },
      });
      if (!likedStar) {
        return false;
      }
      return likedStar;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "🚨 좋아요한 이벤트 조회 중 오류 발생:",
          error instanceof Error ? error.stack : error
        );
      }
      throw new Error(
        `좋아요한 이벤트를 불러오는 중 오류가 발생했습니다. Details: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }

  async createStartoLiked(starId: number, userId: string): Promise<LikedStar> {
    try {
      return await prisma.likedStar.create({
        data: {
          starId: starId,
          userId: userId,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 좋아요한 이벤트 생성 중 오류 발생:", error);
      }
      throw new Error(
        `좋아요한 이벤트 생성 중 오류가 발생했습니다. Details: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }

  async deleteLikedStarByStarId(starId: number, userId: string): Promise<void> {
    try {
      await prisma.likedStar.delete({
        where: {
          starId_userId: {
            starId: starId,
            userId: userId,
          },
        },
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 좋아요한 이벤트 삭제 중 에러 발생:", error);
      }
      throw new Error(
        `좋아요한 이벤트 삭제 중 오류가 발생했습니다. Details: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }
  async findLikedStarsByUserId(userId: string): Promise<LikedStar[]> {
    try {
      const likedStars = await prisma.likedStar.findMany({
        where: { userId },
      });

      return likedStars;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "🚨 좋아요한 스타 조회 중 오류 발생:",
          error instanceof Error ? error.stack : error
        );
      }
      throw new Error(
        `좋아요한 스타를 불러오는 중 오류가 발생했습니다. Details: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }

  async createLikedStar(likedStar: LikedStar): Promise<void> {
    try {
      await prisma.likedStar.create({
        data: {
          userId: likedStar.userId,
          starId: likedStar.starId,
        },
      });
    } finally {
      await prisma.$disconnect();
    }
  }
}
