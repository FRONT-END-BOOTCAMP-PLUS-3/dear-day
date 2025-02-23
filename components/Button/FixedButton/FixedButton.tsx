"use client";

import styles from "./FixedButton.module.scss";

interface FixedButtonProps {
  onClick: () => void;
  value: string;
  disabled?: boolean;
}

const FixedButton = ({
  onClick,
  value,
  disabled = false,
}: FixedButtonProps) => {
  return (
    <div
      className={`${styles.fixedButtonContainer} ${disabled ? styles.disabled : ""}`}
      onClick={!disabled ? onClick : undefined}
    >
      <p>{value}</p>
    </div>
  );
};

export default FixedButton;
