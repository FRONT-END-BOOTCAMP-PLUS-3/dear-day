"use client"; // 클라이언트 컴포넌트로 설정

import { useRouter } from "next/navigation";
import styles from "./TwoTab.module.scss";

interface TwoTabProps {
  options: [string, string];
  selectedTab: string;
}

const TwoTab = ({ options, selectedTab }: TwoTabProps) => {
  const router = useRouter();

  const handleTabClick = (tab: string) => {
    if (tab !== selectedTab) {
      router.push(`?tab=${encodeURIComponent(tab)}`, { scroll: false });
    }
  };

  return (
    <div className={styles.tabContainer}>
      {options.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${selectedTab === tab ? styles.active : ""}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
      <div
        className={styles.indicator}
        style={{
          transform: `translateX(${selectedTab === options[1] ? "100%" : "0%"})`,
        }}
      />
    </div>
  );
};

export default TwoTab;
