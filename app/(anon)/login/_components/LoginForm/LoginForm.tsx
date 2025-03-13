"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.scss";
import Input from "@/components/Input/Input/Input";

const LoginForm = () => {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 입력값이 없으면 실행하지 않음
    if (!email || !password) return;

    try {
      await login(email, password);
      alert("로그인 성공!");
      router.push("/member");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 로그인 실패:", error);
      }
      alert("로그인 실패"); // ✅ 사용자에게 에러 메시지 표시
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <Input
        name="email"
        type="email"
        value={email}
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        name="password"
        type="password"
        value={password}
        placeholder="비밀번호를 입력하세요."
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className={`${styles.loginButton} ${!email || !password ? styles.disabled : ""}`}
        disabled={!email || !password}
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
