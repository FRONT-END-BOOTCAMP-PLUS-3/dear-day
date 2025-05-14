"use client";

import { useState, useEffect } from "react";
import styles from "./Waiting.module.scss";

interface Props {
  eventId: number;
  headCount: number;
  setHeadCount: (count: number) => void; // 부모에서 전달된 setter 함수
}

export default function Waiting({ eventId, headCount, setHeadCount }: Props) {
  const [waitingCount, setWaitingCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWaitingCount = async () => {
      try {
        setLoading(true);
        setError(null);

        // 실제 API 사용 시:
        const response = await fetch(`/api/event/show-waiting-count`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId }),
        });

        if (!response.ok)
          throw new Error("대기 정보를 가져오는 데 실패했습니다.");

        const data = await response.json();
        setWaitingCount(data.waitingCount);
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("🚨 대기 정보 불러오기 오류:", err);
        }
        setError("대기 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchWaitingCount();
  }, [eventId]);

  const handleIncrease = () => {
    if (headCount < 4) {
      setHeadCount(headCount + 1);
    }
  };

  const handleDecrease = () => {
    if (headCount > 1) {
      setHeadCount(headCount - 1); // headCount - 1로 수정
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
          onClick={handleDecrease} // 불필요한 조건 제거
          disabled={headCount === 1} // disabled인 경우 버튼 비활성화
        >
          −
        </button>
        <span className={styles.reservationCount}>{headCount}</span>
        <button
          className={styles.increaseButton}
          onClick={handleIncrease} // 불필요한 조건 제거
          disabled={headCount === 4} // disabled인 경우 버튼 비활성화
        >
          +
        </button>
      </div>
    </div>
  );
}
