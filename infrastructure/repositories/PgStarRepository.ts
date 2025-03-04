import { StarRepository } from "@/domain/repositories/StarRepository";
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
}
