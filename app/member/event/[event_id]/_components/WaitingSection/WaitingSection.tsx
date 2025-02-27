"use client";

import FixedButton from "@/components/Button/FixedButton/FixedButton";
import Notice from "./Notice/Notice";
import Waiting from "./Waiting/Waiting";
import styles from "./WaitingSection.module.scss";
import { EventData } from "../../eventData";
import { useState, useEffect } from "react";

interface Props {
  eventData: EventData;
}

export default function WaitingSection({ eventData }: Props) {
  const [openWaiting, setOpenWaiting] = useState(false);

  useEffect(() => {
    const checkWaitingAvailability = () => {
      const now = new Date();

      const startDate = new Date(eventData.startDate);
      const endDate = new Date(eventData.endDate);
      endDate.setHours(23, 59, 59, 999); // ✅ endDate의 마지막 시간까지 포함

      const [startHours, startMinutes] = eventData.startTime
        .split(":")
        .map(Number);
      const [endHours, endMinutes] = eventData.endTime.split(":").map(Number);

      const startDateTime = new Date(now);
      startDateTime.setHours(startHours, startMinutes, 0, 0);

      const endDateTime = new Date(now);
      endDateTime.setHours(endHours, endMinutes, 0, 0);

      const isWithinDateRange = now >= startDate && now <= endDate;
      const isWithinTimeRange = now >= startDateTime && now <= endDateTime;

      setOpenWaiting(isWithinDateRange && isWithinTimeRange);
    };

    checkWaitingAvailability();
    const interval = setInterval(checkWaitingAvailability, 1000);

    return () => clearInterval(interval);
  }, [eventData]);

  return (
    <div className={styles.waitingSection}>
      <h3>대기</h3>
      {openWaiting ? (
        <div>
          <Waiting eventId={eventData.id} />
          <Notice />
          <div className={styles.button}>
            <FixedButton
              onClick={() => alert("대기 신청 완료!")}
              value={"대기하기"}
            />
          </div>
        </div>
      ) : (
        <div className={styles.closeWaiting}>대기 가능 시간이 아닙니다.</div>
      )}
    </div>
  );
}
