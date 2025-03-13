import { useState } from "react";
import styles from "./Tab.module.scss";

const Tab = ({
  tabs,
}: {
  tabs: { label: string; content: React.ReactNode }[];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {/* 탭 버튼 */}
      <div className={styles.tabButtons}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${activeIndex === index ? styles.active : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
        {/* 밑줄 애니메이션 효과 */}
        <div
          className={styles.indicator}
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
      </div>

      {/* 선택된 탭의 내용 */}
      <div className={styles.tabContent}>{tabs[activeIndex].content}</div>
    </div>
  );
};

export default Tab;
