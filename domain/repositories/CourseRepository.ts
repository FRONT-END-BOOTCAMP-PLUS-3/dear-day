import { Course } from "@prisma/client";

export interface CourseRepository {
  findAll(userId: string): Promise<Course[] | []>;
  createCourse(userId: string, name: string, date: Date): Promise<Course>;
}
