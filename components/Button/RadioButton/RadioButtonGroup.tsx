"use client";

import React, { useState, ChangeEvent } from "react";
import RadioButton from "./RadioButton";
import styles from "./RadioButton.module.scss";

interface RadioButtonGroupProps {
  name: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const RadioButtonGroup = ({
  name,
  options,
  defaultValue,
  onChange,
}: RadioButtonGroupProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
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
              checked={selectedValue === option.value}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
