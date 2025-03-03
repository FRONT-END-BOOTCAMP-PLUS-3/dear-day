"use client";

import NextButton from "@/components/Button/NextButton/NextButton";
import { useState } from "react";
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

  // useEffect(() => {
  //   const fetchLikedEvents = async () => {
  //     try {
  //       const response = await fetch("/api/course/liked");
  //       const data = await response.json();
  //       setLikedEvents(data);
  //     } catch (error) {
  //       console.error("Liked Events Fetch Error:", error);
  //     }
  //   };
  //   fetchLikedEvents();
  // }, []);

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
