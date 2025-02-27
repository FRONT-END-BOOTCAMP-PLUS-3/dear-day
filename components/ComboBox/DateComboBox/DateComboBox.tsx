"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Icon from "@/components/Icon/Icon";
import styles from "./DateComboBox.module.scss";

interface DateComboBoxProps {
  value: Date | null;
  onChange: (value: Date) => void;
  minDate?: Date;
  name?: string;
}

const formatDate = (date: Date | null) => {
  if (!date || isNaN(date.getTime())) return "YY. MM. DD."; // ✅ NaN 방지
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}.`;
};

const DateComboBox = ({
  value,
  onChange,
  minDate,
  name,
}: DateComboBoxProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value instanceof Date && !isNaN(value.getTime())) {
      setSelectedValue(value.toISOString().split("T")[0]); // ✅ 안전한 변환
    } else {
      setSelectedValue(""); // ✅ 잘못된 값 방지
    }
  }, [value]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    if (!isNaN(newDate.getTime())) {
      setSelectedValue(event.target.value);
      onChange(newDate);
    }
  };

  const minDateValue = useMemo(() => {
    return minDate instanceof Date && !isNaN(minDate.getTime())
      ? minDate.toISOString().split("T")[0]
      : undefined;
  }, [minDate]);

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
        name={name}
        value={selectedValue}
        onChange={handleDateChange}
        className={styles.hiddenDateInput}
        min={minDateValue}
      />

      <div className={styles.iconWrapper}>
        <Icon id="arrow-down" />
      </div>
    </div>
  );
};

export default DateComboBox;
