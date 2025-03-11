"use client";

import { ChangeEvent, useState } from "react";
import UpcomingEvent from "../(anon)/_components/UpcomingEvent/UpcomingEvent";
import MainButton from "../(anon)/_components/MainButton/MainButton";
import Banner from "../(anon)/_components/Banner/Banner";
import styles from "./page.module.scss";
import SearchInput from "@/components/Input/SearchInput/SearchInput";

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
