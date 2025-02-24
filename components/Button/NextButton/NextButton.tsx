"use client";

import styles from "./NextButton.module.scss";

interface NextButtonProps {
  onClick: () => void;
  value: string;
  disabled?: boolean;
}

const NextButton = ({ onClick, value, disabled = false }: NextButtonProps) => {
  return (
    <div
      className={`${styles.nextButtonContainer} ${disabled ? styles.disabled : ""}`}
      onClick={!disabled ? onClick : undefined}
    >
      <p>{value}</p>
    </div>
  );
};

export default NextButton;
