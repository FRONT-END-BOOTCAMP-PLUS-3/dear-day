"use client";

import { useRef } from "react";
import styles from "./DateSelect.module.scss";
import Icon from "@/components/Icon/Icon";

interface DateSelectProps {
  value: string;
  onChange: (date: string) => void;
}

const formatDate = (date: string) => {
  if (!date) return "날짜 선택";
  const [year, month, day] = date.split("-");
  return `${year}. ${month}. ${day}.`;
};

const DateSelect = ({ value, onChange }: DateSelectProps) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div
      className={styles.dateSelectContainer}
      onClick={() => {
        if (dateInputRef.current) {
          dateInputRef.current.showPicker();
        }
      }}
    >
      <Icon id="calendar" />

      {/* 사용자가 선택한 날짜를 표시하는 텍스트 */}
      <span className={styles.selectedDate}>{formatDate(value)}</span>

      {/* 숨겨진 date input */}
      <input
        ref={dateInputRef}
        type="date"
        value={value} // ✅ 부모 상태를 직접 반영
        onChange={handleDateChange}
        className={styles.hiddenDateInput}
      />

      <div className={styles.iconWrapper}>
        <Icon id="arrow-down" />
      </div>
    </div>
  );
};

export default DateSelect;
