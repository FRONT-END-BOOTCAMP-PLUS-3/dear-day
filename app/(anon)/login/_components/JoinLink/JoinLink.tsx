import Link from "next/link";
import styles from "./JoinLink.module.scss";

const JoinLink = () => {
  return (
    <div className={styles.joinLink}>
      <p>아직 계정이 없으신가요?</p>
      <Link href="/join" className={styles.link}>
        회원가입
      </Link>
    </div>
  );
};

export default JoinLink;
