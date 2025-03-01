"use client";

import styles from "./NextButton.module.scss";

interface NextButtonProps {
  type: "button" | "submit";
  onSubmit?: () => void;
  onClick?: () => void;
  value: string;
  disabled?: boolean;
}

const NextButton = ({
  onSubmit,
  onClick,
  value,
  disabled = false,
}: NextButtonProps) => {
  return (
    <button
      className={`${styles.nextButtonContainer} ${disabled ? styles.disabled : ""}`}
      onClick={!disabled ? onClick : undefined}
      onSubmit={!disabled ? onSubmit : undefined}
    >
      <p>{value}</p>
    </button>
  );
};

export default NextButton;
