"use client"; // 클라이언트 컴포넌트

import { useState } from "react";
import styles from "./FourTab.module.scss";

interface FourTabProps {
  options: string[];
}

const FourTab = ({ options }: FourTabProps) => {
  const [selectedTab, setSelectedTab] = useState(options[0]); // 로컬 상태 관리

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
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
          transform: `translateX(${(options.indexOf(selectedTab) / (options.length - 1)) * 100}%)`,
        }}
      />
    </div>
  );
};

export default FourTab;
