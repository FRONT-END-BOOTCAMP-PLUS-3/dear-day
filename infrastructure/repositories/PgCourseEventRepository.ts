import { CourseEventRepository } from "@/domain/repositories/CourseEventRepository";
import { CourseEvent, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PgCourseEventRepository implements CourseEventRepository {
  async findAllCourseEventsByCourseId(
    courseId: number
  ): Promise<CourseEvent[]> {
    try {
      return await prisma.courseEvent.findMany({
        where: { courseId: courseId },
      });
    } catch (error) {
      console.error("이벤트 조회 중 오류 발생:", error);
      throw new Error("이벤트를 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }
}
