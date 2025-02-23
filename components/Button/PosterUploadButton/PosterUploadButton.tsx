"use client";

import Icon from "@/components/Icon/Icon";
import styles from "./PosterUploadButton.module.scss";

interface PosterUploadButtonProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PosterUploadButton = ({ onChange }: PosterUploadButtonProps) => {
  return (
    <label
      htmlFor="poster-input"
      className={styles.PosterUploadButtonContainer}
    >
      <Icon id="plus" />
      <input
        id="poster-input"
        type="file"
        accept="image/*"
        className={styles.HiddenPosterUploadButton}
        onChange={onChange}
      />
    </label>
  );
};

export default PosterUploadButton;
