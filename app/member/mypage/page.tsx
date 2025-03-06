"use client";
import Profile from "./_components/Profile/Profile";
import Tab from "./_components/Tab/Tab";
import Wishlist from "./_components/Wishlist/Wishlist";
import styles from "./page.module.scss";
import ReservationWaiting from "./_components/ReservationWaiting/ReservationWaiting";

const Page = () => {
  return (
    <div className={styles.pageContainer}>
      <Profile username={""} email={""} />
      <div className={styles.tabContainer}>
        <Tab
          tabs={[
            { label: "찜", content: <Wishlist /> },
            { label: "예약/대기", content: <ReservationWaiting /> },
          ]}
        />
      </div>
    </div>
  );
};

export default Page;
