"use client";

import styles from "./StarUploadButton.module.scss";
import Icon from "@/components/Icon/Icon";

interface StarUploadButtonProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StarUploadButton = ({ onChange }: StarUploadButtonProps) => {
  return (
    <label htmlFor="star-input" className={styles.StarUploadButtonContainer}>
      <Icon id="plus" />
      <input
        type="file"
        id="star-input"
        accept="image/*"
        className={styles.HiddenStarUploadButton}
        onChange={onChange}
      />
    </label>
  );
};

export default StarUploadButton;
