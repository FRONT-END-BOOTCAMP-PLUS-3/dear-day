import { CourseEventRepository } from "@/domain/repositories/CourseEventRepository";
import { CourseRepository } from "@/domain/repositories/CourseRepository";
import { ShowCourseListDto } from "./dto/ShowCourseListDto";

export const ShowCourseList = async (
  userId: string,
  courseRepository: CourseRepository,
  courseEventRepository: CourseEventRepository
): Promise<ShowCourseListDto[]> => {
  const courseList = await courseRepository.findAll(userId);

  const courseEventCounts = await Promise.all(
    courseList.map(async (course) => {
      const events = await courseEventRepository.findAllCourseEventsByCourseId(
        course.id
      );
      return { courseId: course.id, eventCount: events.length };
    })
  );

  const result: ShowCourseListDto[] = courseList.map((course) => {
    const countData = courseEventCounts.find((c) => c.courseId === course.id);
    return {
      id: course.id,
      name: course.name,
      date: course.date,
      createdAt: course.createdAt,
      eventCount: countData ? countData.eventCount : 0,
    };
  });

  return result;
};
