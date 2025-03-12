import { UserLikedStarDto } from "@/application/usecases/mypage/dto/UserLikedStarDto";
import { StarRepository } from "@/domain/repositories/StarRepository";
import { StarProfileDto } from "@/application/usecases/star/dto/StarProfileDto";
import { Star, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PgStarRepository implements StarRepository {
  async findStarProfile(starId: number): Promise<StarProfileDto> {
    const star = await prisma.star.findUnique({
      where: { id: starId },
      select: {
        id: true,
        image: true,
        stageName: true,
        group: true,
        birthday: true,
      },
    });
    if (!star) {
      throw new Error("User not found");
    }

    return {
      id: star.id,
      image: star.image,
      stageName: star.stageName,
      group: star.group ?? null,
      birthday: star.birthday
        ? star.birthday.toISOString().split("T")[0]
        : null,
    };
  }
  async findLikedStarsByUserId(userId: string): Promise<UserLikedStarDto[]> {
    // LikedStar 테이블에서 userId에 해당하는 starId 찾기
    const likedStars = await prisma.likedStar.findMany({
      where: { userId },
      select: { starId: true },
    });

    const starIds = likedStars.map((liked) => liked.starId);

    if (starIds.length === 0) return [];

    // 찾은 starId를 기반으로 Star 테이블에서 스타 정보 가져오기
    const stars = await prisma.star.findMany({
      where: { id: { in: starIds } },
      select: { id: true, stageName: true, image: true },
    });

    return stars.map((star) => ({
      starId: star.id,
      name: star.stageName,
      image: star.image,
    }));
  }

  async createStar(star: Star): Promise<void> {
    try {
      await prisma.star.create({
        data: {
          image: star.image,
          realName: star.realName,
          stageName: star.stageName,
          group: star.group,
          birthday: star.birthday,
        },
      });
    } finally {
      await prisma.$disconnect();
    }
  }
  // 스타 ID로 스타 정보 조회
  async findStarByStarId(starId: number): Promise<Star | null> {
    try {
      return await prisma.star.findUnique({
        where: { id: starId },
      });
    } catch (error) {
      console.error("스타 정보 조회 중 오류 발생:", error);
      throw new Error("스타 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect(); // DB 연결 해제
    }
  }

  async findAllStarsByKeyword(keyword: string): Promise<Star[]> {
    try {
      const stars = await prisma.star.findMany({
        where: {
          OR: [
            {
              stageName: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              realName: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              group: {
                contains: keyword,
                mode: "insensitive",
              },
            },
          ],
        },
      });
      return stars;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findAll(): Promise<Star[]> {
    try {
      const stars = await prisma.star.findMany();
      return stars;
    } finally {
      await prisma.$disconnect();
    }
  }
}
