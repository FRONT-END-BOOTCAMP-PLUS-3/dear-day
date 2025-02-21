"use client";

import styles from "./FixedButton.module.scss";

interface FixedButtonProps {
  value: string;
  onClick: () => void;
  disabled?: boolean;
}

const FixedButton = ({
  value,
  onClick,
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
