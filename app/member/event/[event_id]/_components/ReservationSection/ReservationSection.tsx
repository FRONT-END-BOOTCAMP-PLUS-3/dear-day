"use client";

import { useState, useEffect } from "react";
import { EventData } from "../../eventData";
import SelectDateTime from "./SelectDateTime/SelectDateTime";
import Notice from "./Notice/Notice";
import FixedButton from "@/components/Button/FixedButton/FixedButton";
import styles from "./ReservationSection.module.scss";

interface Props {
  eventData: EventData;
}

export default function ReservationSection({ eventData }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const openTime = new Date(eventData.openAt);

      if (now >= openTime) {
        setIsOpen(true);
      } else {
        const diff = openTime.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}시간 ${minutes}분 ${seconds}초`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [eventData.openAt]);

  return (
    <div className={styles.reservationSection}>
      <h3>예약</h3>

      {isOpen ? (
        <div className={styles.reservationInfo}>
          <SelectDateTime eventData={eventData} />
          <Notice />
          <FixedButton onClick={() => alert("예약 완료!")} value={"예약하기"} />
        </div>
      ) : (
        <div className={styles.openInfo}>
          <p>📅 예약 오픈: {eventData.openAt.toLocaleString()}</p>
          <p>⏳ 오픈까지 {timeLeft} 남았습니다.</p>
        </div>
      )}
    </div>
  );
}
