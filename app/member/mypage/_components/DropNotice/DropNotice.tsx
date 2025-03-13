import styles from "./DropNotice.module.scss";
import { useEffect, useState } from "react";
import Checkbox from "../CheckBox/CheckBox";

export type DropNoticeProps = {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
};

const DropNotice: React.FC<DropNoticeProps> = ({
  onConfirm,
  onCancel,
  isOpen,
}) => {
  const [checked, setChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(checked);
  }, [checked]);

  const handleClose = () => {
    setChecked(false);
    setIsValid(false);
    onCancel();
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch("/api/mypage/drop-user", {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("탈퇴 실패");
      }

      onConfirm();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 탈퇴 실패:", error);
      }
      alert("탈퇴 처리 중 오류가 발생했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalItem}>
          <h1>탈퇴 전 꼭 확인해 주세요</h1>
          <h4>개인 정보는 즉시 삭제 돼요.</h4>
          <p>
            이름, 이메일 주소, 찜한 스타, 찜한 카페, 코스 등 모든 정보가 즉시
            삭제돼요.
          </p>
          <h4>등록한 생카 정보는 삭제 되지 않아요</h4>
          <p>
            Dear Day는 모두가 함께 만드는 생카 지도 서비스예요. 등록한 생카
            정보가 있다면, 탈퇴 후에도 모두를 위해 지워지지 않아요.
          </p>
        </div>
        <div className={styles.checkBox}>
          <Checkbox checked={checked} onChange={setChecked} />
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={handleClose}
          >
            취소
          </button>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={handleConfirm}
            disabled={!isValid}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropNotice;
