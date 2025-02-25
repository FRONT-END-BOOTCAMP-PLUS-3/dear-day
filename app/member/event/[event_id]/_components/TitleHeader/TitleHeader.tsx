import { EventData } from "../../eventData";
import TitleContents from "./TitleContents/TitleContents";
import styles from "./TitleHeader.module.scss";

interface Props {
  eventData: EventData;
}

export default function TitleHeader({ eventData }: Props) {
  return (
    <div
      className={styles.titleHeader}
      style={{ backgroundImage: `url(${eventData.mainImage})` }}
    >
      <TitleContents />
    </div>
  );
}
