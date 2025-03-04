import { StarRepository } from "@/domain/repositories/StarRepository";
import { Star, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PgStarRepository implements StarRepository {
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

  async searchStarByKeyword(keyword: string): Promise<
    {
      id: number;
      image: string;
      stageName: string | null;
      realName: string | null;
      group: string | null;
    }[]
  > {
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
        select: {
          id: true,
          image: true,
          stageName: true,
          realName: true,
          group: true,
        },
      });
      return stars;
    } finally {
      await prisma.$disconnect();
    }
  }
}
