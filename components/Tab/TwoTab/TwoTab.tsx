"use client";

import { useState } from "react";
import styles from "./TwoTab.module.scss";

interface TwoTabProps {
  options: [string, string];
}

const TwoTab = ({ options }: TwoTabProps) => {
  const [selectedTab, setSelectedTab] = useState(options[0]);

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
          transform: `translateX(${selectedTab === options[1] ? "100%" : "0%"})`,
        }}
      />
    </div>
  );
};

export default TwoTab;
