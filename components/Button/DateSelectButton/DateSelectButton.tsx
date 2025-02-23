"use client";

import { useState, useRef } from "react";
import styles from "./DateSelectButton.module.scss";
import Icon from "@/components/Icon/Icon";

interface DateSelectButtonProps {
  value: string;
  onChange: (value: string) => void;
}

const formatDate = (date: string) => {
  if (!date) return "YYYY. MM. DD.";
  const [year, month, day] = date.split("-");
  return `${year}. ${month}. ${day}.`;
};

const DateSelectButton = ({ value, onChange }: DateSelectButtonProps) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className={styles.dateSelectWrapper}>
      <div className={styles.dateSelectContainer}>
        <span className={styles.selectedDate}>{formatDate(selectedValue)}</span>
        <input
          ref={dateInputRef}
          type="date"
          value={selectedValue}
          onChange={handleDateChange}
          className={styles.hiddenDateInput}
        />
        <div
          className={styles.iconWrapper}
          onClick={(e) => {
            e.stopPropagation();
            dateInputRef.current?.showPicker();
          }}
        >
          <Icon id="arrow-down" />
        </div>
      </div>
    </div>
  );
};

export default DateSelectButton;
