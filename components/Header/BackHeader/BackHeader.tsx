"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon/Icon";
import style from "./BackHeader.module.scss";
import Modal from "@/components/modal/Modal";

const BackHeader = ({
  title,
  isBackConfirmRequired = false,
}: {
  title: string;
  isBackConfirmRequired?: boolean;
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackClick = () => {
    if (isBackConfirmRequired) {
      setIsModalOpen(true); // Open modal when back confirmation is required
    } else {
      router.back(); // Otherwise, go back directly
    }
  };

  const handleModalConfirm = () => {
    router.back(); // Go back if confirmed
    setIsModalOpen(false); // Close modal
  };

  const handleModalCancel = () => {
    setIsModalOpen(false); // Close modal if cancelled
  };

  return (
    <header className={style.backHeader}>
      <div className={style.icons} onClick={handleBackClick}>
        <Icon id="arrow-left" />
      </div>
      <h1 className={style.title}>{title}</h1>

      {/* Modal for back confirmation */}
      <Modal
        contents={[
          {
            type: "textOnly",
            title: "이 페이지를 떠나시겠습니까?",
          },
        ]}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
        isOpen={isModalOpen}
      />
    </header>
  );
};

export default BackHeader;
