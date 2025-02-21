"use client";

import styles from "./TwoTab.module.scss";

interface TwoTabProps {
  options: [string, string];
  selectedTab: string;
  onChange: (tab: string) => void;
}

const TwoTab = ({ options, selectedTab, onChange }: TwoTabProps) => {
  return (
    <div className={styles.tabContainer}>
      {options.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${selectedTab === tab ? styles.active : ""}`}
          onClick={() => onChange(tab)}
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
