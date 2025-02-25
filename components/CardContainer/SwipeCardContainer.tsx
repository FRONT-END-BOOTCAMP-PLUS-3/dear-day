import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./CardContainer.module.scss";

const SwipeCardContainer = ({ children }: { children: React.ReactNode }) => {
  const items = React.Children.toArray(children);
  const totalPages = Math.ceil(items.length / 3); // 3개씩 그룹화
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true, // 마우스로도 가능
  });

  return (
    <div className={styles.swipeContainer} {...swipeHandlers}>
      <div
        className={styles.swipeWrapper}
        style={{ transform: `translateX(-${currentPage * 100}%)` }}
      >
        {items.map((child, index) => (
          <div key={index} className={styles.swipeItem}>
            {child}
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className={styles.swipePagination}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentPage ? styles.active : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeCardContainer;
