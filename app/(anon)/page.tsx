"use client";

import UpcomingEvent from "../(anon)/_components/UpcomingEvent/UpcomingEvent";
import MainButton from "../(anon)/_components/MainButton/MainButton";
import Banner from "../(anon)/_components/Banner/Banner";
import styles from "./page.module.scss";
import SearchStarModal from "../(anon)/_components/SearchStarModal/SearchStarModal";
import useToggle from "@/hooks/useToggle";
import SearchInput from "@/components/Input/SearchInput/SearchInput";

export default function HomePage() {
  const [isModalOpen, toggleModal] = useToggle(false);

  return (
    <div className={styles.homeContainer}>
      <Banner />
      <div className={styles.contentsWrapper}>
        <SearchInput onFocus={toggleModal} />
        <SearchStarModal isOpen={isModalOpen} onClose={toggleModal} />
        <MainButton />
        <UpcomingEvent />
      </div>
    </div>
  );
}
