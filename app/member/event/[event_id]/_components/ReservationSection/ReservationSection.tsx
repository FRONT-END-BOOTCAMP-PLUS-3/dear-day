"use client";

import { useState, useEffect } from "react";
import { ShowEventDetailDto } from "@/application/usecases/event/dto/ShowEventDetailDto";
import SelectDateTime from "./SelectDateTime/SelectDateTime";
import Notice from "./Notice/Notice";
import FixedButton from "@/components/Button/FixedButton/FixedButton";
import styles from "./ReservationSection.module.scss";
import useReservationStore from "@/store/reservationStore";

interface Props {
  eventData: ShowEventDetailDto;
}

export default function ReservationSection({ eventData }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const { isSoldOut } = useReservationStore();
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const openTime = eventData.openAt
        ? new Date(eventData.openAt)
        : new Date();
      const endTime = new Date(eventData.endDate);

      if (now >= endTime) {
        setIsEnded(true);
      } else if (now >= openTime) {
        setIsOpen(true);
      } else {
        const diff = openTime.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}시간 ${minutes}분 ${seconds}초`);
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);

    return () => clearInterval(interval);
  }, [eventData.openAt, eventData.endDate]);

  // 24시간제 변환 함수
  const formatTo24Hour = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  };

  return (
    <div className={styles.reservationSection}>
      <h3>예약</h3>

      {isEnded ? (
        <div className={styles.openInfo}>
          <p>종료된 생일카페입니다 :)</p>
        </div>
      ) : eventData.hasReservation ? ( // ✅ 이미 예약한 경우 메시지 표시
        <div className={styles.openInfo}>
          <p>이미 예약을 완료한 생일카페입니다.</p>
        </div>
      ) : isOpen ? (
        <div className={styles.reservationInfo}>
          <SelectDateTime eventData={eventData} />
          <Notice breaktime={eventData.breaktime || 0} />
          <FixedButton
            onClick={() => alert("예약 완료!")}
            value={isSoldOut ? "매진" : "예약하기"}
            disabled={isSoldOut} // 예약 불가능하면 버튼 비활성화
          />
        </div>
      ) : (
        <div className={styles.openInfo}>
          <p>
            <span className={styles.bold}>
              {eventData.openAt
                ? formatTo24Hour(new Date(eventData.openAt))
                : "날짜 정보 없음"}
            </span>{" "}
            오픈 예정
          </p>
          <p>
            <span className={styles.bold}>{timeLeft}</span> 남았어요!
          </p>
        </div>
      )}
    </div>
  );
}
