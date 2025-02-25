"use client";

import FourTab from "@/components/Tab/FourTab/FourTab";
import TitleHeader from "./_components/TitleHeader/TitleHeader";
import DetailSection from "./_components/DetailSection/DetailSection";
import BenefitList from "./_components/BenefitList/BenefitList";
import LocationSection from "./_components/LocationSection/LocationSection";
import ReservationSection from "./_components/ReservationSection/ReservationSection";
import WaitingSection from "./_components/WaitingSection/WaitingSection";
import styles from "./page.module.scss";

export default function EventDetail() {
  return (
    <div className={styles.eventDetailPage}>
      <div className={styles.titleHeader}>
        <TitleHeader />
      </div>
      <FourTab
        options={[]}
        selectedTab={""}
        onChange={function (tab: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      <DetailSection />
      <BenefitList />
      <LocationSection />
      <ReservationSection />
      <WaitingSection />
    </div>
  );
}
