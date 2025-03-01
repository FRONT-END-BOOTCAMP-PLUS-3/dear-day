"use client";

import { useState, useEffect } from "react";
import styles from "./Waiting.module.scss";

interface Props {
  eventId: number;
}

export default function Waiting({ eventId }: Props) {
  const [waitingCount, setWaitingCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reservationCount, setReservationCount] = useState<number>(1); // ✅ 최소 1명부터 시작

  useEffect(() => {
    const fetchWaitingCount = async () => {
      try {
        setLoading(true);
        setError(null);
        setWaitingCount(10); // ✅ 데모 데이터 (실제 API 사용 시 변경 가능)

        // 실제 API 사용 시:
        // const response = await fetch(`/api/waiting?eventId=${eventId}`);
        // if (!response.ok) throw new Error("대기 정보를 가져오는 데 실패했습니다.");
        // const data = await response.json();
        // setWaitingCount(data.waitingCount);
      } catch (err) {
        setError("대기 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchWaitingCount();
  }, [eventId]);

  const handleIncrease = () => {
    if (reservationCount < 4) {
      setReservationCount((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (reservationCount > 1) {
      setReservationCount((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.waitingContainer}>
      {loading ? (
        <p className={styles.waitingNotice}>대기 정보를 불러오는 중...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <p className={styles.waitingNotice}>
          현재 대기 총{" "}
          <span className={styles.waitingCount}>{waitingCount ?? 0}</span>팀
        </p>
      )}

      <h4>예약 인원</h4>
      <div className={styles.counterContainer}>
        <button
          className={styles.decreaseButton}
          onClick={handleDecrease}
          disabled={reservationCount === 1}
        >
          −
        </button>
        <span className={styles.reservationCount}>{reservationCount}</span>
        <button
          className={styles.increaseButton}
          onClick={handleIncrease}
          disabled={reservationCount === 4}
        >
          +
        </button>
      </div>
    </div>
  );
}
