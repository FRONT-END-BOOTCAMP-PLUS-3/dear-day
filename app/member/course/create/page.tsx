"use client";

import NextButton from "@/components/Button/NextButton/NextButton";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import useToggle from "@/hooks/useToggle";
import LikedEventsContainer, {
  CourseEventProps,
} from "./_components/LikedEventsContainer/LikedEventsContainer";
import CourseModal from "./_components/CourseModal/CourseModal";

const CourseCreatePage = () => {
  const [isModalOpen, toggleModal] = useToggle(false);
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  const [likedEvents, setLikedEvents] = useState<CourseEventProps[]>([]);

  useEffect(() => {
    const fetchLikedEvents = async () => {
      try {
        const response = await fetch("/api/like/list");
        const data = await response.json();
        setLikedEvents(data);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("🚨 찜 목록 불러오기 에러 발생:", error);
        }
      }
    };
    fetchLikedEvents();
  }, []);

  const handleMakeCourse = () => {
    toggleModal();
  };

  return (
    <div className={styles.homeContainer}>
      <LikedEventsContainer
        selectedEvents={selectedEvents}
        likedEvents={likedEvents}
        onSelectionChange={(selected) => setSelectedEvents(selected)}
      />
      <div className={styles.buttonWrapper}>
        <NextButton
          type="button"
          onClick={handleMakeCourse}
          value="코스 만들기"
          disabled={likedEvents.length === 0 || selectedEvents.length === 0}
        />
        <CourseModal
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          selectedEvents={selectedEvents}
        />
      </div>
    </div>
  );
};

export default CourseCreatePage;
