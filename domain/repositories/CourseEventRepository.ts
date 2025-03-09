import { CourseEvent } from "@prisma/client";

export interface CourseEventRepository {
  findAllCourseEventsByCourseId(courseId: number): Promise<CourseEvent[]>;
  createCourseEvent(
    courseId: number,
    eventId: number,
    order: number
  ): Promise<CourseEvent>;
}
