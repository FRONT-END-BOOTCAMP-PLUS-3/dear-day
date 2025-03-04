"use client";

import NextButton from "@/components/Button/NextButton/NextButton";
import { useState } from "react";
import styles from "./page.module.scss";
import LikedEventsContainer, {
  CourseEventProps,
} from "../../create/_components/LikedEventsContainer/LikedEventsContainer";
import { useRouter } from "next/navigation";

const CourseEditPage = () => {
  const router = useRouter();
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  const [likedEvents, setLikedEvents] = useState<CourseEventProps[]>([]);

  // useEffect(() => {
  //   async function fetchLikedEvents() {
  //     try {
  //       const response = await fetch("/api/course/liked");
  //       if (!response.ok) {
  //         console.error("Failed to fetch liked events");
  //         return;
  //       }
  //       const data = await response.json();
  //       setLikedEvents(data.likedEvents);
  //     } catch (error) {
  //       console.error("Error fetching liked events:", error);
  //     }
  //   }
  //   fetchLikedEvents();
  // }, []);

  // useEffect(() => {
  //   if (!courseId) return;
  //   async function fetchCourseEvents() {
  //     try {
  //       const response = await fetch(`/api/course/events`);
  //       if (!response.ok) {
  //         console.error("Failed to fetch course events");
  //         return;
  //       }
  //       const data = await response.json();
  //       const eventIds = data.events.map((event: { id: number }) => event.id);
  //       setSelectedEvents(eventIds);
  //     } catch (error) {
  //       console.error("Error fetching course events:", error);
  //     }
  //   }
  //   fetchCourseEvents();
  // }, [courseId]);

  return (
    <div className={styles.homeContainer}>
      <LikedEventsContainer
        likedEvents={likedEvents}
        selectedEvents={selectedEvents}
        onSelectionChange={(selected) => setSelectedEvents(selected)}
      />
      <div className={styles.buttonWrapper}>
        <NextButton
          onClick={() => router.back()}
          value="코스 수정하기"
          disabled={likedEvents.length === 0 || selectedEvents.length === 0}
        />
      </div>
    </div>
  );
};

export default CourseEditPage;
