"use client";

import { useState, useRef, useEffect } from "react";
import Icon from "@/components/Icon/Icon";
import styles from "./TimeSelectButton.module.scss";

interface TimeSelectButtonProps {
  value: string;
  onChange: (value: string) => void;
}

const generateTimeOptions = () => {
  const options: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hh = h.toString().padStart(2, "0");
      const mm = m.toString().padStart(2, "0");
      options.push(`${hh}:${mm}`);
    }
  }
  return options;
};

const TimeSelectButton = ({ value, onChange }: TimeSelectButtonProps) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTimeSelect = (time: string) => {
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

  const displayValue = selectedValue || "HH : MM";

  return (
    <div className={styles.timeSelectWrapper}>
      <div className={styles.timeSelectContainer} ref={containerRef}>
        <span className={styles.selectedtime}>{displayValue}</span>
        <div
          className={styles.iconWrapper}
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          <Icon id="arrow-down" />
        </div>
        {isDropdownOpen && (
          <ul className={styles.dropdownList}>
            {generateTimeOptions().map((time) => (
              <li
                key={time}
                className={styles.dropdownItem}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TimeSelectButton;
