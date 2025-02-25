import Dropdown from "./_components/Dropdown/Dropdown";
import List from "./_components/List/List";
import Tab from "./_components/Tab/Tab";
import styles from "./page.module.scss";

export default function ListPage() {
  return (
    <div className={styles.listContainer}>
      <Tab />
      <Dropdown />
      <List />
    </div>
  );
}
