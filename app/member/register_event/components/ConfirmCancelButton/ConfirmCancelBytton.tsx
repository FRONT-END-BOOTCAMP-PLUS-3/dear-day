import styles from "./ConfirmCancelButton.module.scss";

type ConfirmCancelButtonProps = {
  onConfirm: () => void;
  onCancel: () => void;
  isConfirmDisabled?: boolean; // 추가
};

const ConfirmCancelButton = ({
  onConfirm,
  onCancel,
  isConfirmDisabled = false, // 기본값: false
}: ConfirmCancelButtonProps) => {
  return (
    <div className={styles["actions"]}>
      <button className={styles["cancel-btn"]} onClick={onCancel}>
        이전
      </button>
      <button
        className={styles["confirm-btn"]}
        onClick={onConfirm}
        disabled={isConfirmDisabled} // 여기에 적용
      >
        다음
      </button>
    </div>
  );
};

export default ConfirmCancelButton;
