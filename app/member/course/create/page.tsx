"use client";

import NextButton from "@/components/Button/NextButton/NextButton";
import LargeCardView from "@/components/EventView/LargeCardView/LargeCardView";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useCourseStore } from "@/store/courseStore";
import ScrollCardContainer from "@/components/CardContainer/ScrollCardContainer";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export interface CourseEventProps {
  id: number;
  title: string;
  starName: string;
  startDate: Date;
  endDate: Date;
  address: string;
  imgSrc: string;
}

const CourseCreatePage = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { name, date, setCourseEvent } = useCourseStore();
  const [likedEvents, setLikedEvents] = useState<CourseEventProps[]>();
  const [selectedEvents, setSelectedEvents] = useState<CourseEventProps[]>([]);

  useEffect(() => {
    const fetchLikedEventList = async () => {
      try {
        const response = await fetch("/api/course/create");
        const data = await response.json();
        setLikedEvents(data);
      } catch (error) {
        console.error("코스 목록 불러오기 실패:", error);
      }
    };

    fetchLikedEventList();
  }, []);

  const handleToggleEvent = (e: React.MouseEvent, event: CourseEventProps) => {
    e.stopPropagation();
    setSelectedEvents((prev) =>
      prev.find((item) => item.id === event.id)
        ? prev.filter((item) => item.id !== event.id)
        : [...prev, event]
    );
  };

  const handleMakeCourse = async () => {
    if (selectedEvents.length > 0) {
      setCourseEvent(selectedEvents);
    }

    try {
      const response = await fetch("/api/course/create", {
        method: "POST",
        body: JSON.stringify({
          user_id: user?.id,
          name,
          date,
        }),
      });
      const data = await response.json();
      const courseId = data.id;
      alert("코스 만들기 완료!");
      router.push(`/member/course/${courseId}`);
    } catch (error) {
      console.error("코스 생성 실패:", error);
      alert("코스 생성에 실패했습니다.");
    }
  };

  return (
    <div className={styles.homeContainer}>
      <ScrollCardContainer variant="grid">
        {likedEvents && likedEvents.length > 0 ? (
          likedEvents.map((event) => (
            <div
              key={event.id}
              onClick={(e) => handleToggleEvent(e, event)}
              className={
                selectedEvents.find((item) => item.id === event.id)
                  ? `${styles.cardWrapper} ${styles.selected}`
                  : `${styles.cardWrapper}`
              }
            >
              <LargeCardView {...event} readOnly={true} />
            </div>
          ))
        ) : (
          <div className={styles.emptyBox}>
            <h3 className={styles.emptyText}>찜한 이벤트가 없습니다.</h3>
          </div>
        )}
        <NextButton onClick={handleMakeCourse} value="코스 만들기" />
      </ScrollCardContainer>
    </div>
  );
};

export default CourseCreatePage;
