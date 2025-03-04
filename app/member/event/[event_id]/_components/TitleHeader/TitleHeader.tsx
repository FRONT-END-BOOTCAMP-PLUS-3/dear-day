import { ShowEventDetailDto } from "@/application/usecases/event/dto/ShowEventDetailDto";
import TitleContents from "./TitleContents/TitleContents";
import styles from "./TitleHeader.module.scss";

interface Props {
  eventData: ShowEventDetailDto;
}

export default function TitleHeader({ eventData }: Props) {
  return (
    <div
      className={styles.titleHeader}
      style={{ backgroundImage: `url(${eventData.mainImage})` }}
    >
      <TitleContents eventData={eventData} />
    </div>
  );
}
