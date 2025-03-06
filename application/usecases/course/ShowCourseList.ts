import { CourseEventRepository } from "@/domain/repositories/CourseEventRepository";
import { CourseRepository } from "@/domain/repositories/CourseRepository";
import { EventRepository } from "@/domain/repositories/EventRepository";
import { ShowCourseListDto } from "./dto/ShowCourseListDto";

export const ShowCourseList = async (
  userId: string,
  courseRepository: CourseRepository,
  eventRepository: EventRepository,
  courseEventRepository: CourseEventRepository
): Promise<ShowCourseListDto[]> => {
  const courseList = await courseRepository.findAll(userId);

  const result: ShowCourseListDto[] = await Promise.all(
    courseList.map(async (course) => {
      const events = await courseEventRepository.findAllCourseEventsByCourseId(
        course.id
      );
      let imgSrc = "";
      if (events.length > 0) {
        const eventData = await eventRepository.findEventByEventId(
          events[0].id
        );
        if (eventData) {
          imgSrc = eventData.mainImage;
        }
      }
      return {
        id: course.id,
        name: course.name,
        date:
          typeof course.date === "string" ? new Date(course.date) : course.date,
        createdAt:
          typeof course.createdAt === "string"
            ? new Date(course.createdAt)
            : course.createdAt,
        eventCount: events.length,
        imgSrc,
      };
    })
  );

  return result;
};
