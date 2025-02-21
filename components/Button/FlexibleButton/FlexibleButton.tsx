"use client";

import styles from "./FlexibleButton.module.scss";

interface FlexibleButtonProps {
  value: string;
  onClick: () => void;
}

const FlexibleButton = ({ value, onClick }: FlexibleButtonProps) => {
  return (
    <div className={styles.flexibleButtonContainer} onClick={onClick}>
      <p>{value}</p>
    </div>
  );
};

export default FlexibleButton;
