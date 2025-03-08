"use client";

import NextButton from "@/components/Button/NextButton/NextButton";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import LikedEventsContainer, {
  CourseEventProps,
} from "../../create/_components/LikedEventsContainer/LikedEventsContainer";
import { useParams, useRouter } from "next/navigation";
import { ShowCourseEventsDto } from "@/application/usecases/course/dto/ShowCourseEventsDto";

const CourseEditPage = () => {
  const router = useRouter();
  const { course_id } = useParams();
  const courseId = Number(course_id);
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  const [likedEvents, setLikedEvents] = useState<CourseEventProps[]>([]);

  useEffect(() => {
    async function fetchLikedEvents() {
      try {
        const response = await fetch("/api/like/list", {
          credentials: "include",
        });
        if (!response.ok) {
          console.error("Failed to fetch liked events");
          return;
        }
        const data = await response.json();
        setLikedEvents(data);
      } catch (error) {
        console.error("Error fetching liked events:", error);
      }
    }
    fetchLikedEvents();
  }, []);

  useEffect(() => {
    if (!courseId) return;
    async function fetchCourseEvents() {
      try {
        const response = await fetch(
          `/api/course/detail?courseId=${courseId}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          console.error("Failed to fetch course events");
          return;
        }
        const data = await response.json();
        const ids = data.map((event: ShowCourseEventsDto) => event.eventId);
        setSelectedEvents(ids);
      } catch (error) {
        console.error("Error fetching course events:", error);
      }
    }
    fetchCourseEvents();
  }, [courseId]);

  return (
    <div className={styles.homeContainer}>
      <LikedEventsContainer
        likedEvents={likedEvents}
        selectedEvents={selectedEvents}
        onSelectionChange={(selected) => setSelectedEvents(selected)}
      />
      <div className={styles.buttonWrapper}>
        <NextButton
          type="button"
          onClick={() => router.back()}
          value="코스 수정하기"
          disabled={!likedEvents || !selectedEvents}
        />
      </div>
    </div>
  );
};

export default CourseEditPage;
