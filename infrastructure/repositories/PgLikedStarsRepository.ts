import { LikedStarsRepository } from "@/domain/repositories/LikedStarsRepository";
import { LikedStar, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PgLikedStarsRepository implements LikedStarsRepository {
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
