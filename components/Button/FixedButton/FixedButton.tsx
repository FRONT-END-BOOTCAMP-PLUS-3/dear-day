"use client";

import styles from "./FixedButton.module.scss";

interface FixedButtonProps {
  value: string;
  onClick: () => void;
}

const FixedButton = ({ value, onClick }: FixedButtonProps) => {
  return (
    <div className={styles.fixedButtonContainer} onClick={onClick}>
      <p>{value}</p>
    </div>
  );
};

export default FixedButton;
