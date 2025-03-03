"use client";

import { useState, useRef, useEffect } from "react";
import Icon from "@/components/Icon/Icon";
import styles from "./TimeComboBox.module.scss";

interface TimeComboBoxProps {
  value?: Date;
  onChange: (value: Date) => void;
  minTime?: Date; // ✅ 최소 선택 가능 시간 추가
}

const generateTimeOptions = (baseDate: Date, minTime?: Date): Date[] => {
  const options: Date[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const optionDate = new Date(baseDate);
      optionDate.setHours(h, m, 0, 0);

      // ✅ minTime이 설정되어 있다면, minTime 이후의 시간만 추가
      if (!minTime || optionDate >= minTime) {
        options.push(optionDate);
      }
    }
  }
  return options;
};

const formatTime = (date: Date | null): string => {
  if (!date || isNaN(date.getTime())) return "HH : MM";
  const hh = date.getHours().toString().padStart(2, "0");
  const mm = date.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
};

const TimeComboBox = ({ value, onChange, minTime }: TimeComboBoxProps) => {
  const [selectedValue, setSelectedValue] = useState<Date | null>(
    value ?? null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTimeSelect = (time: Date) => {
    setSelectedValue(time);
    onChange(time);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayValue = formatTime(selectedValue);
  const baseDate = selectedValue ? selectedValue : new Date();

  return (
    <div className={styles.timeSelectWrapper}>
      <div
        className={styles.timeSelectContainer}
        ref={containerRef}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <Icon id="clock" />
        <span className={styles.selectedTime}>{displayValue}</span>
        <div className={styles.iconWrapper}>
          <Icon id="arrow-down" />
        </div>

        {isDropdownOpen && (
          <ul
            className={styles.dropdownList}
            onClick={(e) => e.stopPropagation()}
          >
            {generateTimeOptions(baseDate, minTime).map((time, idx) => (
              <li
                key={idx}
                className={styles.dropdownItem}
                onClick={() => handleTimeSelect(time)}
              >
                {formatTime(time)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TimeComboBox;
