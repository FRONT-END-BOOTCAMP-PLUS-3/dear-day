"use client";

import styles from "./FourTab.module.scss";

interface FourTabProps {
  options: string[];
  selectedTab: string;
  onChange: (tab: string) => void;
}

const FourTab = ({ options, selectedTab, onChange }: FourTabProps) => {
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
          transform: `translateX(${(options.indexOf(selectedTab) / (options.length - 1)) * 100}%)`,
        }}
      />
    </div>
  );
};

export default FourTab;
