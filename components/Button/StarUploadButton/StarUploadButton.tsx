"use client";

import styles from "./StarUploadButton.module.scss";
import Icon from "@/components/Icon/Icon";
import Image from "next/image";

interface StarUploadButtonProps {
  previewImage?: string | null; // 미리보기 이미지 URL
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StarUploadButton = ({
  previewImage,
  onChange,
}: StarUploadButtonProps) => {
  return (
    <label htmlFor="star-input" className={styles.StarUploadButtonContainer}>
      {previewImage ? (
        <Image
          src={previewImage}
          alt="업로드한 이미지"
          width={120}
          height={120}
          className={styles.StarUploadButtonPreview}
        />
      ) : (
        <Icon id="plus" />
      )}
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
