import { CourseEvent } from "@prisma/client";

export interface CourseEventRepository {
  findAllCourseEventsByCourseId(courseId: number): Promise<CourseEvent[]>;
}
