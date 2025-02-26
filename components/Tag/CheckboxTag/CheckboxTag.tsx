"use client";

import React from "react";
import styles from "./CheckboxTag.module.scss";

interface CheckboxTagProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const CheckboxTag = ({ checked, onChange, label }: CheckboxTagProps) => {
  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.checkboxInput}
      />
      <span className={styles.customCheckbox}>{label}</span>
    </label>
  );
};

export default CheckboxTag;
