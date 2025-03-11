import { CourseEventRepository } from "@/domain/repositories/CourseEventRepository";
import { UpdateCourseEventDto } from "./dto/UpdateCourseEventDto";

export const UpdateCourseEvent = async (
  id: number,
  order: number,
  courseEventRepository: CourseEventRepository
): Promise<UpdateCourseEventDto> => {
  const course = await courseEventRepository.updateCourseEvent(id, order);

  return course;
};
