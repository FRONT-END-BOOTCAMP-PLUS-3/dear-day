import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>메인페이지</main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
