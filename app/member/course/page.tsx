"use client";

import React, { useEffect, useState } from "react";
import CourseMakingButton from "./_components/CourseMakingButton/CourseMakingButton";
import styles from "./page.module.scss";
import CourseListView, {
  CourseListViewProps,
} from "@/components/EventView/CourseListView/CourseListView";
import Modal from "@/components/modal/Modal";
import { useRouter } from "next/navigation";
import useToggle from "@/hooks/useToggle";
import { useCourseStore } from "@/store/courseStore";
import { InputFormData } from "@/components/modal/Modal.type";
import { ShowCourseListDto } from "@/application/usecases/course/dto/ShowCourseListDto";

export default function CoursePage() {
  const router = useRouter();
  const [isModalOpen, toggleModal] = useToggle(false);
  const { setName, setDate } = useCourseStore();
  const [courseList, setCourseList] = useState<ShowCourseListDto[]>([]);
  const [pastCourseList, setPastCourseList] = useState<ShowCourseListDto[]>([]);

  useEffect(() => {
    const fetchCourseList = async () => {
      try {
        const response = await fetch("/api/course", {
          credentials: "include",
        });

        if (!response.ok) {
          if (process.env.NODE_ENV === "development") {
            console.error("🚨 코스 목록 불러오기 실패");
          }
          return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const data: ShowCourseListDto[] = await response.json();

        const currentCourse = data.filter(
          (course) => new Date(course.date) >= today
        );
        const pastCourse = data.filter(
          (course) => new Date(course.date) < today
        );
        setCourseList(currentCourse);
        setPastCourseList(pastCourse);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("🚨 코스 목록 불러오기 실패:", error);
        }
      }
    };
    fetchCourseList();
  }, []);

  const handleConfirm = (inputFormData?: InputFormData) => {
    if (!inputFormData) return;
    const courseName = inputFormData.modal_text;
    const courseDate = inputFormData.modal_calendar;

    if (courseName) {
      setName(courseName);
    }
    if (courseDate) {
      setDate(new Date(courseDate));
    }
    router.push("/member/course/create");
  };

  const handleCancel = () => {
    toggleModal();
    setName("");
    setDate(new Date());
  };

  const handleCourseClick = async (course: CourseListViewProps) => {
    router.push(`/member/course/${course.id}`);
  };

  return (
    <div className={styles.homeContainer}>
      <div onClick={() => toggleModal()}>
        <CourseMakingButton />
      </div>
      <Modal
        contents={[
          { type: "text", title: "코스 이름을 작성해 주세요" },
          { type: "calendar", title: "코스 이용 날짜를 선택해 주세요" },
        ]}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isOpen={isModalOpen}
        confirmText="완료"
        cancelText="취소"
      />
      {courseList.length > 0 ? (
        <>
          <p>다가오는 코스</p>
          {courseList.map((course) => (
            <div key={course.id} className={styles.container}>
              <div
                onClick={() => handleCourseClick(course)}
                className={styles.courseListView}
              >
                <CourseListView {...course} isPast={false} />
              </div>
            </div>
          ))}
          {pastCourseList.length > 0 && (
            <>
              <p>종료된 코스</p>
              {pastCourseList.map((course) => (
                <div key={course.id} className={styles.container}>
                  <div
                    onClick={() => handleCourseClick(course)}
                    className={styles.courseListView}
                  >
                    <CourseListView {...course} isPast={true} />
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      ) : (
        <div className={styles.emptyNoticeContainer}>
          <p className={styles.text}>등록된 코스가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
