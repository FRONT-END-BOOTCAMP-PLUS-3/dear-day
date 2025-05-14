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
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 이벤트 불러오는 중 오류 발생:", error);
      }
      throw new Error("이벤트를 불러오는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async createCourseEvent(
    courseId: number,
    eventId: number,
    order: number
  ): Promise<CourseEvent> {
    try {
      return await prisma.courseEvent.create({
        data: {
          courseId,
          eventId,
          order,
        },
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 코스 이벤트 생성 중 오류 발생:", error);
      }
      throw new Error("코스 이벤트를 생성하는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteCourseEvent(courseId: number, eventId: number): Promise<void> {
    try {
      await prisma.courseEvent.deleteMany({
        where: {
          courseId: courseId,
          eventId: eventId,
        },
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 코스 이벤트 삭제 중 오류 발생:", error);
      }
    }
  }

  async updateCourseEvent(id: number, order: number): Promise<CourseEvent> {
    try {
      return await prisma.courseEvent.update({
        where: {
          id,
        },
        data: {
          order,
        },
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 코스 이벤트 생성 중 오류 발생:", error);
      }
      throw new Error("코스 이벤트를 생성하는 중 오류가 발생했습니다.");
    } finally {
      await prisma.$disconnect();
    }
  }
}
