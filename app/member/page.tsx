"use client";

import { ChangeEvent, useState } from "react";
import UpcomingEvent from "../(anon)/_components/UpcomingEvent/UpcomingEvent";
import MainButton from "../(anon)/_components/MainButton/MainButton";
import Banner from "../(anon)/_components/Banner/Banner";
import styles from "./page.module.scss";
import SearchInput from "@/components/Input/SearchInput/SearchInput";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const [searchWord, setSearchWord] = useState("");

  async function handleLogout() {
    await logout();
    router.push("/login"); // ✅ 로그아웃 후 로그인 페이지로 이동
  }
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  return (
    <div className={styles.homeContainer}>
      <Banner />
      <div className={styles.contentsWrapper}>
        <button onClick={handleLogout}>로그아웃</button>
        <SearchInput value={searchWord} onChange={handleSearch} />
        <MainButton />
        <UpcomingEvent />
      </div>
    </div>
  );
}
