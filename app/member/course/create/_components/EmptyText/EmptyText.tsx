import styles from "./EmptyText.module.scss";

export default function EmptyText() {
  return (
    <div className={styles.emptyBox}>
      <h3 className={styles.emptyText}>
        찜한 이벤트가 없습니다. <br />
        코스에 추가할 이벤트를 찜한 뒤 코스를 만들어주세요!
      </h3>
    </div>
  );
}
