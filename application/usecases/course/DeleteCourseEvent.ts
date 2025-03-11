import { CourseEventRepository } from "@/domain/repositories/CourseEventRepository";

export const DeleteCourseEvent = async (
  courseId: number,
  eventId: number,
  courseEventRepository: CourseEventRepository
): Promise<void> => {
  await courseEventRepository.deleteCourseEvent(courseId, eventId);
};
