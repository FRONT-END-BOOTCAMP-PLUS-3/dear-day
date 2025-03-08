import { CourseEventRepository } from "@/domain/repositories/CourseEventRepository";
import { EventRepository } from "@/domain/repositories/EventRepository";
import { StarRepository } from "@/domain/repositories/StarRepository";
import { ShowCourseEventsDto } from "./dto/ShowCourseEventsDto";

export const ShowCourseEvents = async (
  courseId: number,
  courseEventRepository: CourseEventRepository,
  eventRepository: EventRepository,
  starRepository: StarRepository
): Promise<ShowCourseEventsDto[]> => {
  const courseEvents =
    await courseEventRepository.findAllCourseEventsByCourseId(courseId);

  const showCourseEvents = await Promise.all(
    courseEvents.map(async (courseEvent) => {
      const id = courseEvent.id;
      const order = courseEvent.order;
      const eventDetail = await eventRepository.findEventByEventId(
        courseEvent.eventId
      );

      if (!eventDetail || !eventDetail.starId) {
        return null;
      }

      const star = await starRepository.findStarByStarId(eventDetail.starId);
      const starName = star?.realName || "Unknown";

      return {
        id,

        eventId: eventDetail.id,
        imgSrc: eventDetail.mainImage,
        title: eventDetail.title,
        startDate: eventDetail.startDate,
        endDate: eventDetail.endDate,
        latitude: eventDetail.latitude,
        longitude: eventDetail.longitude,

        order,
        starName,
      } as ShowCourseEventsDto;
    })
  );

  if (showCourseEvents == null) {
    return [];
  }

  return showCourseEvents.filter(
    (dto): dto is ShowCourseEventsDto => dto !== null
  );
};
