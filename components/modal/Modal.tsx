import React, { useCallback, useEffect, useState } from "react";
import { InputFormData, ModalProps } from "./Modal.type";
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
  const [inputFormData, setInputFormData] = useState<InputFormData>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (name: string, value: string) => {
    setInputFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setInputFormData({});
    setIsValid(false);
    onCancel();
  };

  // 폼 유효성 검사
  const validateForm = useCallback(
    (data: InputFormData) => {
      let valid = true;

      contents.forEach((content) => {
        if ("textOnly" in content) return;

        const name = `modal_${content.type}`;

        if (content.type === "text") {
          const textValue = data[name] || "";
          if (!textValue.trim()) valid = false;
        }
        if (content.type === "calendar") {
          if (!data[name]) valid = false;
        }
      });
      return valid;
    },
    [contents]
  );

  const isAlertType = contents.some((content) => content.type === "alert");

  // inputFormData 변경 시 유효성 검사 실행
  useEffect(() => {
    setIsValid(validateForm(inputFormData));
  }, [inputFormData, validateForm]);

  if (!isOpen) return null;

  return (
    <div className={styles["modalContainer"]} onClick={handleClose}>
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        {contents.map((content, idx) => (
          <div key={idx} className={styles["modalItem"]}>
            <h2>{content.title}</h2>
            <ModalType content={content} onChange={handleChange} />
          </div>
        ))}
        <div className={styles["actions"]}>
          {!isAlertType && (
            <button
              type="button"
              className={styles["cancel-btn"]}
              onClick={handleClose}
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            className={styles["confirm-btn"]}
            onClick={() => {
              onConfirm(inputFormData);
            }}
            disabled={!isValid}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
