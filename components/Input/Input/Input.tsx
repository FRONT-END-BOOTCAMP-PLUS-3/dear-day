"use client";

import { ChangeEvent } from "react";
import styles from "./input.module.scss";

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input = ({
  value,
  onChange,
  placeholder = "이름을 입력해주세요 ex) 디어데이 생일카페",
}: InputProps) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default Input;
