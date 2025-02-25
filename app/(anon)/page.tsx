"use client";

import SearchInput from "@/components/Input/SearchInput/SearchInput";
import styles from "./page.module.scss";
import MainButton from "./_components/MainButton/MainButton";
import { ChangeEvent, useState } from "react";
import Banner from "./_components/Banner/Banner";
import UpcomingEvent from "./_components/UpcomingEvent/UpcomingEvent";

export default function HomePage() {
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  return (
    <div className={styles.homeContainer}>
      <Banner />
      <div className={styles.contentsWrapper}>
        <SearchInput value={searchWord} onChange={handleSearch} />
        <MainButton />
        <UpcomingEvent />
      </div>
    </div>
  );
}
