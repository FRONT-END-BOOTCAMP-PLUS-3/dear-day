"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon/Icon";
import LargeCardView from "@/components/EventView/LargeCardView/LargeCardView";
import styles from "./UpcomingEvent.module.scss";
import { useEffect, useState } from "react";
import {
  ShowUpcomingEventsDto,
  UpcomingEventDto,
} from "@/application/usecases/event/dto/ShowUpcomingEventsDto";

const UpcomingEvent = () => {
  const router = useRouter();
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEventDto[]>([]);

  const handleUpcomingEventList = () => {
    router.push(`/member/list`);
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/main/upcoming-event", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("네트워크 응답 에러");
        }
        const data: ShowUpcomingEventsDto = await response.json();
        const eventsArray = data.ShowUpcomingEvents;
        const shuffled = shuffleArray(eventsArray);
        setUpcomingEvents(shuffled);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("🚨 다가오는 이벤트 목록 에러:", error);
        }
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className={styles.upcomingEventContainer}>
      <div className={styles.upcomingEventHeader}>
        <p className={styles.text}>다가오는 생카</p>
        <button className={styles.button} onClick={handleUpcomingEventList}>
          <Icon id="arrow-right" />
        </button>
      </div>
      <div className={styles.cardScroller}>
        {upcomingEvents.map((event) => (
          <LargeCardView key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvent;
