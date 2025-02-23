"use client";

import React, { ChangeEvent } from "react";
import styles from "./RadioButton.module.scss";

interface RadioButtonProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({
  name,
  value,
  label,
  checked,
  onChange,
  ...props
}: RadioButtonProps) => {
  return (
    <label className={styles.radioLabel}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.radioInput}
        {...props}
      />
      <span className={styles.customRadio}></span>
      {label && <span className={styles.radioText}>{label}</span>}
    </label>
  );
};

export default RadioButton;
