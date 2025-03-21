"use client";

import FixedButton from "@/components/Button/FixedButton/FixedButton";
import Notice from "./Notice/Notice";
import Waiting from "./Waiting/Waiting";
import styles from "./WaitingSection.module.scss";
import { ShowEventDetailDto } from "@/application/usecases/event/dto/ShowEventDetailDto";
import { useState, useEffect } from "react";
import TicketModal from "@/components/modal/TicketModal";
import useToggle from "@/hooks/useToggle";

interface Props {
  eventData: ShowEventDetailDto;
}

export default function WaitingSection({ eventData }: Props) {
  const [openWaiting, setOpenWaiting] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [headCount, setHeadCount] = useState<number>(1);
  const [isModalOpen, toggleModal] = useToggle(false);
  const [isNearby, setIsNearby] = useState(false);

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

    // ⏰ 현재 시간에서 시간과 분만 가져오기
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();

    // 🕒 현재 시간이 startTime과 endTime 사이인지 확인
    const isWithinTimeRange =
      nowHours > startHours ||
      (nowHours === startHours && nowMinutes >= startMinutes)
        ? nowHours < endHours ||
          (nowHours === endHours && nowMinutes <= endMinutes)
        : false;
    const isWithinDateRange = now >= startDate && now <= endDate;

    setOpenWaiting(isWithinDateRange && isWithinTimeRange);

    const nextUpdate: number | null = null;

    if (nextUpdate !== null) {
      const timeout = setTimeout(() => {
        setOpenWaiting(isWithinTimeRange);
        if (now >= endDateTime || now >= endDate) {
          setIsEnded(true);
        }
      }, nextUpdate);

      return () => clearTimeout(timeout);
    }

    // ✅ 현재 위치와 이벤트 위치 간 거리 계산
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const eventLat = eventData.latitude;
        const eventLng = eventData.longitude;

        const distance = getDistanceFromLatLonInMeters(
          userLat,
          userLng,
          eventLat,
          eventLng
        );

        setIsNearby(distance <= 500); // 500m 이내이면 true
      });
    }
  }, [eventData]);

  // ✅ Haversine formula를 이용한 거리 계산 함수
  function getDistanceFromLatLonInMeters(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371e3; // 지구 반지름 (미터)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // 거리 (미터 단위)
  }

  // 모달 닫힐 때 페이지 새로고침
  const handleCloseModal = () => {
    toggleModal(); // 모달 닫기
    window.location.reload();
  };

  // 대기 요청 함수
  const handleWaiting = async () => {
    if (!eventData.id || headCount < 1) {
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
          eventId: eventData.id,
          headCount,
        }),
      });

      if (!response.ok) {
        throw new Error("대기 요청 실패!");
      }
      toggleModal();
    } catch (error) {
      alert("대기 중 오류가 발생했습니다. 다시 시도해주세요.");
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 대기 목록:", error);
      }
    }
  };

  return (
    <div className={styles.waitingSection}>
      <h3>대기</h3>
      {isEnded ? (
        <div className={styles.closeWaiting}>종료된 생일카페입니다.</div>
      ) : eventData.hasWaiting ? ( // 이미 예약한 경우 메시지 표시
        <div className={styles.openInfo}>
          <p>이미 대기중인 생일카페입니다.</p>
        </div>
      ) : openWaiting && isNearby ? ( // 500m 이내 & openWaiting=true 조건 추가
        <div>
          <Waiting
            eventId={eventData.id}
            headCount={headCount}
            setHeadCount={setHeadCount}
          />
          <Notice />
          <div className={styles.button}>
            <FixedButton onClick={handleWaiting} value={"대기하기"} />
          </div>
        </div>
      ) : openWaiting && !isNearby ? ( // 500m 이내 X & openWaiting=true 조건 추가
        <div className={styles.closeWaiting}>
          대기 등록은 생일카페 반경 500m 이내에서만 가능합니다.
        </div>
      ) : (
        <div className={styles.closeWaiting}>대기 가능 시간이 아닙니다.</div>
      )}
      {isModalOpen && (
        <TicketModal
          eventId={eventData.id}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
