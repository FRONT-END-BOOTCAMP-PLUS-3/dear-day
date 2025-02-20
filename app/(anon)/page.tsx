import styles from "../page.module.scss";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>로그인 안한 사람 메인페이지</main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
