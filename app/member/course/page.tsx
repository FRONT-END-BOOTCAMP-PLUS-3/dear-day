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

export default function CoursePage() {
  const router = useRouter();
  const { setName, setDate } = useCourseStore();

  const [courseList, setCourseList] = useState<CourseListViewProps[]>([]);
  const [isModalOpen, toggleModal] = useToggle(false);

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

  const handleConfirm = (inputFormData?: InputFormData) => {
    if (!inputFormData) return;
    const courseName = inputFormData.modal_text;
    const courseDate = inputFormData.modal_calendar;

    if (courseName) {
      setName(courseName);
    }
    if (courseDate) {
      setDate(new Date(courseDate));
      console.log(new Date(courseDate));
    }

    toggleModal();
    router.push("/member/course/create");
  };

  const handleCancel = () => {
    toggleModal();
    setName("");
    setDate(new Date());
  };

  return (
    <div className={styles.homeContainer}>
      <div onClick={() => toggleModal()}>
        <CourseMakingButton />
      </div>
      <Modal
        contents={[
          {
            type: "text",
            title: "코스 이름을 작성해 주세요",
          },
          {
            type: "calendar",
            title: "코스 이용 날짜를 선택해 주세요",
          },
        ]}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isOpen={isModalOpen}
        confirmText="완료"
        cancelText="취소"
      />
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
