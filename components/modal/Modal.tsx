import React, { useState } from "react";
import { ModalProps } from "./Modal.type";
import ModalType from "./ModalType";
import styles from "./Modal.module.scss";

const Modal: React.FC<ModalProps> = ({
  contents,
  onConfirm,
  onCancel,
  isOpen,
  confirmText = "확인",
  cancelText = "취소",
}) => {
  // 여러 input/달력 데이터를 모을 수 있도록 상태로 관리
  const [formData, setFormData] = useState<Record<string, string | undefined>>(
    {}
  );

  if (!isOpen) return null;

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmClick = () => {
    // formData를 상위로 전달
    onConfirm(formData);
  };
  // "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  return (
    <div className={styles["modalContainer"]}>
      <div className={styles["modal"]}>
        {contents.map((content, idx) => (
          <div key={idx} className="mb-4">
            {/* 제목 */}
            <h2>{content.title}</h2>
            {/* 실제 입력/달력/텍스트 렌더링 */}
            <ModalType content={content} onChange={handleChange} />
          </div>
        ))}

        {/* 버튼들 */}
        <div className="mt-6 flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleConfirmClick}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
