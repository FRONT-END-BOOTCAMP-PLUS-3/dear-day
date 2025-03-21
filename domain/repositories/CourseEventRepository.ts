import { CourseEvent } from "@prisma/client";

export interface CourseEventRepository {
  findAllCourseEventsByCourseId(courseId: number): Promise<CourseEvent[]>;
  createCourseEvent(
    courseId: number,
    eventId: number,
    order: number
  ): Promise<CourseEvent>;
  deleteCourseEvent(courseId: number, eventId: number): Promise<void>;
  updateCourseEvent(id: number, order: number): Promise<CourseEvent>;
}
