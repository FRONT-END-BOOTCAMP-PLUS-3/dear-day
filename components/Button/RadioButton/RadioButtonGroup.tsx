"use client";

import React, { ChangeEvent } from "react";
import RadioButton from "./RadioButton";
import styles from "./RadioButton.module.scss";

interface RadioButtonGroupProps {
  name: string;
  options: { label: string; value: string | number }[];
  value?: string | number; // 🔹 추가: 외부에서 선택된 값 전달
  defaultValue?: string | number;
  onChange?: (value: string) => void;
}

const RadioButtonGroup = ({
  name,
  options,
  value, // 🔹 추가
  defaultValue,
  onChange,
}: RadioButtonGroupProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={styles.radioContainer}>
      <div className={styles.radioItem}>
        {options.map((option) => (
          <div key={option.value} className={styles.radioOption}>
            <RadioButton
              name={name}
              value={option.value}
              label={option.label}
              checked={
                value ? value === option.value : defaultValue === option.value
              } // 🔹 value 추가
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
