import { CourseEventRepository } from "@/domain/repositories/CourseEventRepository";
import { CourseRepository } from "@/domain/repositories/CourseRepository";
import { CreateCourseDto } from "./dto/CreateCourseDto";

export const CreateCourse = async (
  userId: string,
  name: string,
  date: Date,
  selectedEvents: number[],
  courseRepository: CourseRepository,
  courseEventRepository: CourseEventRepository
): Promise<CreateCourseDto[]> => {
  const course = await courseRepository.createCourse(userId, name, date);
  const courseId = course.id;

  const courseEvents = await Promise.all(
    selectedEvents.map(async (eventId, order) => {
      return await courseEventRepository.createCourseEvent(
        courseId,
        eventId,
        order
      );
    })
  );

  return courseEvents;
};
