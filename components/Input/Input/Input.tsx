"use client";

import { ChangeEvent } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  name: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel"; // 확장 가능
}

const Input = ({
  name,
  value,
  onChange,
  placeholder = "이름을 입력해주세요 ex) 디어데이 생일카페",
  type = "text",
}: InputProps) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default Input;
