"use client";

import { useEffect, useState } from "react";
import CourseMakingButton from "./_components/CourseMakingButton/CourseMakingButton";
import styles from "./page.module.scss";
import CourseListView, {
  CourseListViewProps,
} from "@/components/EventView/CourseListView/CourseListView";

export default function CoursePage() {
  const [courseList, setCourseList] = useState<CourseListViewProps[]>([]);

  useEffect(() => {
    const fetchCourseList = async () => {
      try {
        const response = await fetch("/api/course");
        const data = await response.json();
        setCourseList(data);
      } catch (error) {
        console.error("코스 목록 불러오기 실패:", error);
      }
    };

    fetchCourseList();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <CourseMakingButton />
      {courseList.length > 0 ? (
        courseList.map((course) => (
          <CourseListView key={course.id} {...course} />
        ))
      ) : (
        <div className={styles.emptyNoticeContainer}>
          <p className={styles.text}>등록된 코스가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
