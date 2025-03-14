"use client";

import Image from "next/image";
import styles from "./EventInfo.module.scss";
import Icon from "@/components/Icon/Icon";

interface EventInfoProps {
  title: string;
  imgSrc: string;
  address: string;
  startDate: Date;
  endDate: Date;
  mode: string;
}

const EventInfo: React.FC<EventInfoProps> = ({
  title,
  imgSrc,
  address,
  startDate,
  endDate,
  mode,
}) => {
  const formatShortDate = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <div className={styles.eventInfoContainer}>
      <Image
        src={imgSrc}
        alt={`${title}포스터`}
        width={107}
        height={127}
        className={styles.eventInfoImg}
      />
      <div className={styles.eventInfoContent}>
        <h3 className={styles.eventInfoTitle}>{title}</h3>
        <div className={styles.eventInfoLocation}>
          <Icon id={"map"} />
          <p>{address}</p>
        </div>
        <p>
          <time dateTime={startDate.toISOString()}>
            {formatShortDate(startDate)}
          </time>
          &nbsp;~&nbsp;
          <time dateTime={endDate.toISOString()}>
            {formatShortDate(endDate)}
          </time>
        </p>
        <p>{mode === "RESERVATION" ? "예약 시스템" : "대기 시스템"}</p>
      </div>
    </div>
  );
};

export default EventInfo;
