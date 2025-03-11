import styles from "./EmptyText.module.scss";
import { useRouter } from "next/navigation";
type EmptyTextProps = {
  container: string;
};
const EmptyText = ({ container }: EmptyTextProps) => {
  const router = useRouter();

  const handle = () => {
    router.push("list");
  };
  switch (container) {
    case "LikedEvent":
      return (
        <div className={styles.emptyBox}>
          <h3 className={styles.emptyText}>찜한 이벤트가 없습니다.</h3>
          <button className={styles.createEventBtn} onClick={handle}>
            + 카페 추가하기
          </button>
        </div>
      );

    case "Reservation":
      return (
        <div className={styles.emptyBox}>
          <h3 className={styles.emptyText}>예약 중인 이벤트가 없습니다.</h3>
          <button className={styles.createEventBtn} onClick={handle}>
            + 생카 둘러보기
          </button>
        </div>
      );

    case "Waiting":
      return (
        <div className={styles.emptyBox}>
          <h3 className={styles.emptyText}>대기 중인 이벤트가 없습니다.</h3>
          <button className={styles.createEventBtn} onClick={handle}>
            + 생카 둘러보기
          </button>
        </div>
      );

    case "VisitedEvent":
      return (
        <div className={styles.emptyBox}>
          <h3 className={styles.emptyText}>다녀온 생카가 없습니다.</h3>
          <button className={styles.createEventBtn} onClick={handle}>
            + 생카 둘러보기
          </button>
        </div>
      );

    default:
      return null;
  }
};
export default EmptyText;
