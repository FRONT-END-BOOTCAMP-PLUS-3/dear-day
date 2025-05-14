"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ShowEventDetailDto } from "@/application/usecases/event/dto/ShowEventDetailDto";
import SelectDateTime from "./SelectDateTime/SelectDateTime";
import Notice from "./Notice/Notice";
import FixedButton from "@/components/Button/FixedButton/FixedButton";
import styles from "./ReservationSection.module.scss";
import useReservationStore from "@/store/reservationStore";
import useToggle from "@/hooks/useToggle";
import TicketModal from "@/components/modal/TicketModal";

interface Props {
  eventData: ShowEventDetailDto;
}

export default function ReservationSection({ eventData }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const { date, time, isSoldOut } = useReservationStore();
  const [timeLeft, setTimeLeft] = useState<string>("");
  const { event_id } = useParams();
  const eventId = event_id as string;
  const [isModalOpen, toggleModal] = useToggle(false);

  useEffect(() => {
    if (!eventData) return;

    const updateStatus = () => {
      const now = new Date();

      // ✅ UTC에서 KST 변환을 올바르게 적용 (추가 변환 X)
      const openAt = eventData.openAt ? new Date(eventData.openAt) : new Date();

      // ✅ UTC에서 KST 변환을 올바르게 적용
      const closeAt = (() => {
        const endDateKST = new Date(eventData.endDate);

        // 날짜만 유지
        endDateKST.setHours(0, 0, 0, 0);

        // endTime 적용 (KST 기준)
        const [hours, minutes] = eventData.endTime.split(":").map(Number);
        endDateKST.setHours(hours, minutes, 0, 0);

        return endDateKST;
      })();

      if (now < openAt) {
        setIsOpen(false);
        setIsEnded(false);

        const diff = openAt.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}시간 ${minutes}분 ${seconds}초`);
      } else if (now < closeAt) {
        setIsOpen(true);
        setIsEnded(false);
      } else {
        setIsOpen(false);
        setIsEnded(true);
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);

    return () => clearInterval(interval);
  }, [eventData]);

  useEffect(() => {}, [isOpen]);

  // 모달 닫힐 때 페이지 새로고침
  const handleCloseModal = () => {
    toggleModal(); // 모달 닫기
    window.location.reload();
  };

  // 예약 요청 함수
  const handleReservation = async () => {
    if (!date || !time) {
      alert("날짜와 시간을 입력해주세요!");
      return;
    }

    try {
      const response = await fetch(`/api/event/make-reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 쿠키 포함 요청
        body: JSON.stringify({
          eventId, // body로 eventId 포함
          date,
          time,
        }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          alert("예약 가능 인원을 초과했습니다.");
          window.location.reload(); // 페이지 새로고침
        } else {
          throw new Error("예약 요청 실패!");
        }
        return;
      }

      toggleModal();
    } catch (error) {
      alert("예약 중 오류가 발생했습니다. 다시 시도해주세요.");
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 예약 오류:", error);
      }
    }
  };

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

      {!isOpen && isEnded ? (
        <div className={styles.openInfo}>
          <p>종료된 생일카페입니다 :)</p>
        </div>
      ) : eventData.hasReservation ? ( // 이미 예약한 경우 메시지 표시
        <div className={styles.openInfo}>
          <p>이미 예약을 완료한 생일카페입니다.</p>
        </div>
      ) : isOpen && !isEnded ? (
        <div className={styles.reservationInfo}>
          <SelectDateTime eventData={eventData} />
          <Notice breaktime={eventData.breaktime || 0} />
          <FixedButton
            onClick={handleReservation} // 예약 버튼 클릭 시 `handleReservation` 실행
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
      {isModalOpen && (
        <TicketModal
          eventId={parseInt(eventId, 10)}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
