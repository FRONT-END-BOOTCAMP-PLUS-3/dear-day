"use client";

import styles from "./FlexibleButton.module.scss";

interface FlexibleButtonProps {
  onClick: () => void;
  value: string;
  disabled?: boolean;
}

const FlexibleButton = ({
  onClick,
  value,
  disabled = false,
}: FlexibleButtonProps) => {
  return (
    <div
      className={`${styles.flexibleButtonContainer} ${disabled ? styles.disabled : ""}`}
      onClick={!disabled ? onClick : undefined}
    >
      <p>{value}</p>
    </div>
  );
};

export default FlexibleButton;
