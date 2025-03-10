"use client";

import useReservationStore from "@/store/reservationStore"; // ✅ Zustand 스토어 가져오기
import styles from "./Notice.module.scss";

interface Props {
  breaktime: number; // ✅ breaktime은 0, 10, 15, 20 중 하나
}

export default function Notice({ breaktime }: Props) {
  const { time } = useReservationStore(); // ✅ Zustand에서 상태 가져오기

  // time이 존재할 경우 HH:mm 형식을 파싱하여 계산
  const calculateEndTime = (startTime: string, breaktime: number): string => {
    const [hours, minutes] = startTime.split(":").map(Number); // "HH:mm" → [HH, mm]
    const totalMinutes = hours * 60 + minutes + (60 - breaktime); // 현재 시간 + 이용 시간
    const endHours = Math.floor(totalMinutes / 60) % 24; // 24시간제 적용
    const endMinutes = totalMinutes % 60;

    return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`; // "HH:mm" 형식으로 반환
  };

  const endTime = time ? calculateEndTime(time, breaktime) : null; // ✅ 종료 시간 계산

  return (
    <div className={styles.noticeContainer}>
      <ul>
        {time && endTime && (
          <>
            <li>
              해당 시간대{" "}
              <span className={styles.bold}>
                ({time}~{endTime})
              </span>{" "}
              내에 자유롭게 입장할 수 있습니다.
            </li>
            <li>
              단,{" "}
              <span className={styles.bold}>이용 종료 시간은 {endTime}</span>
              으로 고정되며, 반드시 {endTime}까지 퇴장해야 합니다.
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
