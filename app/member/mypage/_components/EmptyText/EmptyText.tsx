import styles from "./EmptyText.module.scss";
import { useRouter } from "next/navigation";

export default function EmptyText() {
  const router = useRouter();

  const handle = () => {
    router.push("list");
  };
  return (
    <div className={styles.emptyBox}>
      <h3 className={styles.emptyText}>찜한 이벤트가 없습니다.</h3>
      <button className={styles.createEventBtn} onClick={handle}>
        + 카페 추가하기
      </button>
    </div>
  );
}
