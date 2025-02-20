"use client";

import { useAuthStore } from "../../../store/authStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter(); // ✅ Next.js의 라우터 사용
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(email, password);
      alert("로그인 성공!");
      router.push("/member"); // ✅ 로그인 성공 후 /member로 이동
    } catch (err) {
      console.error(err);
      alert("로그인 실패!");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button type="submit">로그인</button>
    </form>
  );
}
