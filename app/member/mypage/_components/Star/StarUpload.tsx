"use client";

import styles from "./StarUpload.module.scss";
import Icon from "@/components/Icon/Icon";

interface StarUploadButtonProps {
  onClick: () => void;
}

const StarUploadButton = ({ onClick }: StarUploadButtonProps) => {
  return (
    <div className={styles.starPlusContainer}>
      <button className={styles.starPlusButton} onClick={onClick}>
        <Icon id="plus" />
      </button>
      <p className={styles.plusText}>추가</p>
    </div>
  );
};

export default StarUploadButton;
