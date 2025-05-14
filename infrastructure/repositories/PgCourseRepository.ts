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
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 이벤트 조회 중 오류 발생:", error);
      }
      throw new Error("이벤트를 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async createCourse(
    userId: string,
    name: string,
    date: Date
  ): Promise<Course> {
    try {
      const course = await prisma.course.create({
        data: {
          userId,
          name,
          date,
        },
      });
      return course;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 코스 생성 중 오류 발생:", error);
      }
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteCourse(courseId: number): Promise<void> {
    try {
      await prisma.course.delete({
        where: {
          id: courseId,
        },
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 코스 삭제 중 오류 발생:", error);
      }
    } finally {
      await prisma.$disconnect();
    }
  }
}
