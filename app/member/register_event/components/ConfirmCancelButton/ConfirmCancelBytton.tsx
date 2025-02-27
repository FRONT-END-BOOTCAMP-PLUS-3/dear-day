import styles from "./ConfirmCancelButton.module.scss";
type ConfirmCancelButtonProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmCancelButton = ({
  onConfirm,
  onCancel,
}: ConfirmCancelButtonProps) => {
  return (
    <div className={styles["actions"]}>
      <button className={styles["cancel-btn"]} onClick={onCancel}>
        이전
      </button>
      <button className={styles["confirm-btn"]} onClick={onConfirm}>
        다음
      </button>
    </div>
  );
};
export default ConfirmCancelButton;
