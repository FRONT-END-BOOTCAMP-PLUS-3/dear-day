"use client";

import { useState } from "react";
import styles from "./DateTimeSelectButton.module.scss";
import SelectButton from "./SelectButton/SelectButton";
import useReservations from "./_hooks/useReservations";
import { generateDateList, generateHourlyList } from "./_hooks/utils";
import { DateTimeSelectButtonProps } from "./_hooks/types";

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

  const dates = generateDateList(startDate, endDate);
  const times = selectedDate ? generateHourlyList(startTime, endTime) : [];

  const handleDateSelect = (date: string) => {
    if (disabledDates.includes(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
    onSelectDate(date);
  };

  const handleTimeSelect = (time: string) => {
    if (disabledTimes.includes(time)) return;
    setSelectedTime(time);
    onSelectTime(time);
  };

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
