"use client";

import styles from "./NextButton.module.scss";

interface NextButtonProps {
  type: "button";
  onClick?: () => void;
  value: string;
  disabled?: boolean;
}

const NextButton = ({ onClick, value, disabled = false }: NextButtonProps) => {
  return (
    <button
      className={`${styles.nextButtonContainer} ${disabled ? styles.disabled : ""}`}
      onClick={!disabled ? onClick : undefined}
    >
      <p>{value}</p>
    </button>
  );
};

export default NextButton;
