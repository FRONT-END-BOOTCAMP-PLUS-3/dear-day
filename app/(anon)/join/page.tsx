"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 페이지 이동을 위한 useRouter 추가
import styles from "./page.module.scss";
import JoinForm from "./_components/JoinForm/JoinForm";
import NextButton from "@/components/Button/NextButton/NextButton";

interface FormDataType {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function JoinPage() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormDataType | null>(null);
  const router = useRouter(); // 페이지 이동을 위한 useRouter

  const handleSubmit = (formData: FormDataType) => {
    setSubmittedData(formData);
  };

  const handleJoinClick = async () => {
    if (!submittedData) return;

    const { username, email, password, passwordConfirm } = submittedData;

    // 비밀번호 확인
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 회원가입 API 요청
      const response = await fetch("/api/auth/join/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("회원가입 실패");
      }

      // 성공 시 로그인 페이지로 이동
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      router.push("/login"); // /login 페이지로 이동
    } catch (error) {
      alert(error || "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.joinContainer}>
      <JoinForm setIsFormValid={setIsFormValid} onSubmit={handleSubmit} />
      <NextButton
        onClick={handleJoinClick}
        value="가입하기"
        disabled={!isFormValid}
      />
    </div>
  );
}
