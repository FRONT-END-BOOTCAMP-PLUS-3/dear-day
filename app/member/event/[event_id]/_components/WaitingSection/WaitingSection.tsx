"use client";

import FixedButton from "@/components/Button/FixedButton/FixedButton";
import Notice from "./Notice/Notice";
import Waiting from "./Waiting/Waiting";
import styles from "./WaitingSection.module.scss";
import { ShowEventDetailDto } from "@/application/usecases/event/dto/ShowEventDetailDto";
import { useState, useEffect } from "react";

interface Props {
  eventData: ShowEventDetailDto;
}

export default function WaitingSection({ eventData }: Props) {
  const [openWaiting, setOpenWaiting] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const now = new Date();

    const startDate = new Date(eventData.startDate);
    const endDate = new Date(eventData.endDate);
    endDate.setHours(23, 59, 59, 999); // endDate 마지막까지 포함

    const [startHours, startMinutes] = eventData.startTime
      .split(":")
      .map(Number);
    const [endHours, endMinutes] = eventData.endTime.split(":").map(Number);

    const startDateTime = new Date(now);
    startDateTime.setHours(startHours, startMinutes, 0, 0);

    const endDateTime = new Date(eventData.endDate);
    endDateTime.setHours(endHours, endMinutes, 0, 0);

    // 종료 날짜(endDate) 이후거나, 종료 날짜의 종료 시간(endTime)이 지나면 종료 상태
    if (now > endDateTime || now > endDate) {
      setIsEnded(true);
      return;
    }

    const isWithinDateRange = now >= startDate && now <= endDate;
    const isWithinTimeRange = now >= startDateTime && now <= endDateTime;

    setOpenWaiting(isWithinDateRange && isWithinTimeRange);

    let nextUpdate: number | null = null;

    if (!isWithinDateRange) {
      return;
    } else if (!isWithinTimeRange && now < startDateTime) {
      nextUpdate = startDateTime.getTime() - now.getTime();
    } else if (isWithinTimeRange && now < endDateTime) {
      nextUpdate = endDateTime.getTime() - now.getTime();
    } else if (now < endDate) {
      nextUpdate = endDate.getTime() - now.getTime();
    }

    if (nextUpdate !== null) {
      const timeout = setTimeout(() => {
        setOpenWaiting(!isWithinTimeRange);
        if (now >= endDateTime || now >= endDate) setIsEnded(true);
      }, nextUpdate);

      return () => clearTimeout(timeout);
    }
  }, [eventData]);

  // 대기 요청 함수
  const handleWaiting = async () => {
    if (!eventId || !headCount) {
      alert("유효하지 않은 이벤트입니다.");
      return;
    }

    try {
      const response = await fetch(`/api/event/make-waiting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 쿠키 포함 요청
        body: JSON.stringify({
          eventId,
          headCount,
        }),
      });

      if (!response.ok) {
        throw new Error("예약 요청 실패!");
      }

      alert("예약이 완료되었습니다!"); // TODO: 추후에 성공하면 TicketModal 띄우는거 해야함
    } catch (error) {
      alert("예약 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("예약 오류:", error);
    }
  };

  return (
    <div className={styles.waitingSection}>
      <h3>대기</h3>
      {isEnded ? (
        <div className={styles.closeWaiting}>종료된 생일카페입니다.</div>
      ) : eventData.hasWaiting ? ( // ✅ 이미 예약한 경우 메시지 표시
        <div className={styles.openInfo}>
          <p>이미 대기중인 생일카페입니다.</p>
        </div>
      ) : openWaiting ? (
        <div>
          <Waiting eventId={eventData.id} />
          <Notice />
          <div className={styles.button}>
            <FixedButton onClick={handleWaiting} value={"대기하기"} />
          </div>
        </div>
      ) : (
        <div className={styles.closeWaiting}>대기 가능 시간이 아닙니다.</div>
      )}
    </div>
  );
}
