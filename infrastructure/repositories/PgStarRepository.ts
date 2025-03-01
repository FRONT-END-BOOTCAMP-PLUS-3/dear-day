import StarRepository from "@/domain/repositories/StarRepository";
import { Star, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PgStarRepository implements StarRepository {
  async createStar(star: Star): Promise<void> {
    console.log(star);

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
}
