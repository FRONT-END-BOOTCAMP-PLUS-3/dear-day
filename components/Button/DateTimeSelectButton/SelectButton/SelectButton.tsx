"use client";

import React from "react";
import styles from "./SelectButton.module.scss";

interface SelectButtonProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
  disabledOptions?: string[]; // 예약 완료된 옵션
}

const SelectButton: React.FC<SelectButtonProps> = ({
  options,
  selectedOption,
  onSelect,
  disabledOptions = [],
}) => {
  return (
    <div className={styles.selectButtonWrapper}>
      {options.map((option) => {
        const isDisabled = disabledOptions.includes(option);
        return (
          <button
            key={option}
            className={`${styles.selectButton} ${
              selectedOption === option ? styles.selected : ""
            } ${isDisabled ? styles.disabled : ""}`}
            onClick={() => !isDisabled && onSelect(option)}
            disabled={isDisabled}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default SelectButton;
