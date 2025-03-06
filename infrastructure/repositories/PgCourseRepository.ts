import { Course, PrismaClient } from "@prisma/client";
import { CourseRepository } from "@/domain/repositories/CourseRepository";

const prisma = new PrismaClient();

export class PgCourseRepository implements CourseRepository {
  async findAll(userId: string): Promise<Course[] | []> {
    try {
      return await prisma.course.findMany({
        where: { userId: userId },
      });
    } catch (error) {
      console.error("이벤트 조회 중 오류 발생:", error);
      throw new Error("이벤트를 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }
}
