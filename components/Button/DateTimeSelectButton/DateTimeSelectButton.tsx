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
    const today = new Date();
    const [monthStr, dayStr] = formattedDate.split(" ");

    // 월을 숫자로 변환 (Mar -> 2)
    const month = new Date(`${monthStr} 1, 2000`).getMonth();

    const day = Number(dayStr);
    const year = today.getFullYear();

    // 🎯 UTC 기준으로 날짜 설정 (로컬 타임존 영향을 받지 않도록)
    const parsedDate = new Date(Date.UTC(year, month, day));

    // 날짜만 비교하여 과거라면 다음 해로 설정
    const todayDate = new Date(
      Date.UTC(year, today.getMonth(), today.getDate())
    );
    if (parsedDate < todayDate) {
      parsedDate.setUTCFullYear(year + 1);
    }

    return parsedDate.toISOString().split("T")[0]; // "YYYY-MM-DD" 반환
  };

  const handleDateSelect = (date: string) => {
    if (disabledDates.includes(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
    const isoDate = convertToISODate(date);
    console.log("선택한 날짜", date);
    console.log("선택한 날짜", isoDate);

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
