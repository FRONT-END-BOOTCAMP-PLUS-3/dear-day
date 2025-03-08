"use client";

import React from "react";
import Icon from "@/components/Icon/Icon";
import styles from "./EditHeader.module.scss";
import { useRouter } from "next/navigation";

interface EditHeaderProps {
  courseId: number;
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

const EditHeader = ({
  courseId,
  isEditMode,
  onToggleEditMode,
}: EditHeaderProps) => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      {isEditMode && (
        <span
          className={styles.editHeader}
          onClick={() => router.push(`/member/course/${courseId}/edit`)}
        >
          <Icon id="plus" />
        </span>
      )}
      <span onClick={onToggleEditMode} className={styles.editText}>
        <p className={styles.text}>{isEditMode ? "완료" : "편집"}</p>
      </span>
    </header>
  );
};

export default EditHeader;
