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
  const [headCount, setHeadCount] = useState<number>(1);

  useEffect(() => {
    const fetchWaitingCount = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/waiting`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ eventId, headCount }),
        });
        if (!response.ok)
          throw new Error("대기 정보를 가져오는 데 실패했습니다.");
        const data = await response.json();
        setWaitingCount(data.waitingCount);
      } catch (err) {
        setError("대기 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchWaitingCount();
  }, [eventId]);

  const handleIncrease = () => {
    if (headCount < 4) {
      setHeadCount((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (headCount > 1) {
      setHeadCount((prev) => prev - 1);
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
          disabled={headCount === 1}
        >
          −
        </button>
        <span className={styles.reservationCount}>{headCount}</span>
        <button
          className={styles.increaseButton}
          onClick={handleIncrease}
          disabled={headCount === 4}
        >
          +
        </button>
      </div>
    </div>
  );
}
