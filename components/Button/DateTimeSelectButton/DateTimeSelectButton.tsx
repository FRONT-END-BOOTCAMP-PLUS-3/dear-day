"use client";

import { useEffect, useState } from "react";
import styles from "./DateTimeSelectButton.module.scss";
import SelectButton from "./SelectButton/SelectButton";
import useReservations from "./_hooks/useReservations";
import { generateDateList, generateHourlyList } from "./_hooks/utils";
import { DateTimeSelectButtonProps } from "./_hooks/types";
import useReservationStore from "@/store/reservationStore";

const DateSelectButton: React.FC<DateTimeSelectButtonProps> = ({
  startDate,
  endDate,
  startTime,
  endTime,
  onSelectDate,
  onSelectTime,
  eventId,
  limit,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { disabledDates, disabledTimes } = useReservations(
    eventId,
    limit,
    startTime,
    endTime,
    selectedDate
  );
  const { isSoldOut, setSoldOut } = useReservationStore(); // ✅ Zustand에서 솔드아웃 상태 가져오기

  const dates = generateDateList(startDate, endDate);
  const times = selectedDate ? generateHourlyList(startTime, endTime) : [];

  const convertToISODate = (formattedDate: string): string => {
    const today = new Date(); // 현재 날짜
    const parsedDate = new Date(`${formattedDate}, ${today.getFullYear()}`); // 기본적으로 현재 연도 사용

    // 선택한 날짜가 오늘보다 과거라면 다음 해로 설정
    if (parsedDate < today) {
      parsedDate.setFullYear(today.getFullYear() + 1);
    }

    return parsedDate.toISOString().split("T")[0];
  };

  const handleDateSelect = (date: string) => {
    if (disabledDates.includes(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
    const isoDate = convertToISODate(date);
    onSelectDate(isoDate);
  };

  const handleTimeSelect = (time: string) => {
    if (disabledTimes.includes(time)) return;
    setSelectedTime(time);
    onSelectTime(time);
  };

  // 모든 날짜가 마감되었는지 체크하여 Zustand에 저장
  // ✅ 모든 날짜가 마감되었는지 체크하여 Zustand에 저장 (무한 루프 방지)
  useEffect(() => {
    const allDatesSoldOut =
      dates.length > 0 && dates.every((date) => disabledDates.includes(date));
    const allTimesSoldOut =
      times.length > 0 && times.every((time) => disabledTimes.includes(time));

    const newSoldOutState = allDatesSoldOut || allTimesSoldOut;

    // 🔥 상태가 변경될 때만 setSoldOut 실행 (무한 루프 방지)
    if (isSoldOut !== newSoldOutState) {
      setSoldOut(newSoldOutState);
    }
  }, [dates, disabledDates, times, disabledTimes, isSoldOut, setSoldOut]);

  return (
    <div className={styles.dateTimeSelectContainer}>
      <div className={styles.dateTimeSection}>
        <h3 className={styles.dateTimeSelectTitle}>날짜</h3>
        <SelectButton
          options={dates}
          selectedOption={selectedDate}
          onSelect={handleDateSelect}
          disabledOptions={eventId && limit ? disabledDates : []} // 예약 기능이 없을 때는 비활성화 X
        />
      </div>

      {selectedDate && (
        <div className={styles.dateTimeSection}>
          <h3 className={styles.dateTimeSelectTitle}>시간</h3>
          <SelectButton
            options={times}
            selectedOption={selectedTime}
            onSelect={handleTimeSelect}
            disabledOptions={eventId && limit ? disabledTimes : []} // 예약 기능이 없을 때는 비활성화 X
          />
        </div>
      )}
    </div>
  );
};

export default DateSelectButton;
