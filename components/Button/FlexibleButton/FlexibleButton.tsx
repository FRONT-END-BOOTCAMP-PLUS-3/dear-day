"use client";

import styles from "./FlexibleButton.module.scss";

interface FlexibleButtonProps {
  value: string;
  onClick: () => void;
  disabled?: boolean;
}

const FlexibleButton = ({
  value,
  onClick,
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
