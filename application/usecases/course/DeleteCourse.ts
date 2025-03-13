import { CourseRepository } from "@/domain/repositories/CourseRepository";

export const DeleteCourse = async (
  courseId: number,
  courseRepository: CourseRepository
): Promise<void> => {
  await courseRepository.deleteCourse(courseId);
};
