"use client";

import "./globals.css";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const checkLogin = useAuthStore((state) => state.checkLogin);

  useEffect(() => {
    checkLogin(); // 새로고침 후 로그인 유지
  }, [checkLogin]);

  return (
    <html lang="ko">
      <head>
        <title>Dear Day</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
