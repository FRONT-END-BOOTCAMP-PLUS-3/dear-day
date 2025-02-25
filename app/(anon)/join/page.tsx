"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import JoinForm from "./_components/JoinForm/JoinForm";
import NextButton from "@/components/Button/NextButton/NextButton";

export default function JoinPage() {
  const [isFormValid, setIsFormValid] = useState(false); // ✅ 가입 버튼 활성화 상태

  return (
    <div className={styles.joinContainer}>
      <JoinForm setIsFormValid={setIsFormValid} />
      <NextButton
        onClick={() => alert("가입 완료!")}
        value="가입하기"
        disabled={!isFormValid} // ✅ 모든 조건이 만족될 때만 활성화
      />
    </div>
  );
}
