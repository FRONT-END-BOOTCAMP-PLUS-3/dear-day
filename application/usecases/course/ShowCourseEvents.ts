import { CourseEventRepository } from "@/domain/repositories/CourseEventRepository";
import { ShowCourseEventsDto } from "./dto/ShowCourseEventsDto";

export const ShowEventCount = async (
  courseId: number,
  courseEventRepository: CourseEventRepository
): Promise<ShowCourseEventsDto[]> => {
  const courseEvents =
    await courseEventRepository.findAllCourseEventsByCourseId(courseId);

  return courseEvents;
};
