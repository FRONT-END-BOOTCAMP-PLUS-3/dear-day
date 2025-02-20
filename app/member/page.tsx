"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login"); // ✅ 로그아웃 후 로그인 페이지로 이동
  }

  return (
    <div>
      <h1>안녕하세요, {user?.id}님!</h1>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
