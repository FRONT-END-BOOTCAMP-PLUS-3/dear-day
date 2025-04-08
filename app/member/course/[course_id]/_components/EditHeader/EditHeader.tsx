"use client";

import React from "react";
import Icon from "@/components/Icon/Icon";
import styles from "./EditHeader.module.scss";
import { useRouter } from "next/navigation";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/modal/Modal";

interface EditHeaderProps {
  courseId: number;
  isEditMode: boolean;
  onEnableEditMode: () => void;
  onDisableEditMode: () => void;
}

const EditHeader = ({
  courseId,
  isEditMode,
  onEnableEditMode,
  onDisableEditMode,
}: EditHeaderProps) => {
  const [isModalOpen, toggleModal] = useToggle(false);
  const router = useRouter();

  const handleCourseDelete = async (courseId: number) => {
    try {
      await fetch("/api/course", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
        credentials: "include",
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 코스 삭제 실패:", error);
      }
    } finally {
      router.push("/member/course");
    }
  };

  return (
    <>
      <header className={styles.header}>
        {isEditMode ? (
          <>
            <div className={styles.editHeader}>
              <span
                onClick={() => router.push(`/member/course/${courseId}/edit`)}
              >
                <Icon id="plus" />
              </span>
              <span onClick={toggleModal}>
                <Icon id="trash" size={22} />
              </span>
            </div>
            <span className={styles.editText}>
              <p className={styles.text} onClick={onDisableEditMode}>
                완료
              </p>
            </span>
          </>
        ) : (
          <span className={styles.editText}>
            <p className={styles.text} onClick={onEnableEditMode}>
              편집
            </p>
          </span>
        )}
      </header>
      <Modal
        contents={[
          {
            type: "textOnly",
            title: "정말로 코스를 삭제하시겠습니까?",
          },
        ]}
        onConfirm={() => handleCourseDelete(courseId)}
        onCancel={toggleModal}
        isOpen={isModalOpen}
        confirmText="삭제"
        cancelText="취소"
      />
    </>
  );
};

export default EditHeader;
