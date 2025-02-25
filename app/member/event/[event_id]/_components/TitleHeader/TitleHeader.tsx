import TitleContents from "./TitleContents/TitleContents";
import styles from "./TitleHeader.module.scss";

export default function TitleHeader() {
  return (
    <div className={styles.titleHeader}>
      <TitleContents />
    </div>
  );
}
