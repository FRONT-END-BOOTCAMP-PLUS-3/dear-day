import HeartButton from "@/components/Button/HeartButton/HeartButton";
import styles from "./TitleContents.module.scss";
import Icon from "@/components/Icon/Icon";
import { ShowEventDetailDto } from "@/application/usecases/event/dto/ShowEventDetailDto";

interface Props {
  eventData: ShowEventDetailDto;
}

// 날짜 변환 함수
const formatDateRange = (startDate: Date, endDate: Date): string => {
  const start = new Date(startDate).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const end = new Date(endDate).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return `${start} ~ ${end}`;
};

export default function TitleContents({ eventData }: Props) {
  return (
    <div className={styles.titleBox}>
      <div>
        <h1>{eventData.title}</h1>
        <HeartButton eventId={eventData.id} />
      </div>
      {eventData.twitterId ?? (
        <div>
          <Icon id="x-logo" />
          <p>{eventData.twitterId}</p>
        </div>
      )}
      <div>
        <Icon id="calendar" />
        <p>{formatDateRange(eventData.startDate, eventData.endDate)}</p>{" "}
      </div>
      <div>
        <Icon id="map" />
        <p>{eventData.address}</p>
      </div>
      <div>
        <Icon id="profile" />
        <p>{eventData.starName}</p>
      </div>
    </div>
  );
}
