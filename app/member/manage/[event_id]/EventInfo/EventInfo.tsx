"use client";

import Image from "next/image";
import styles from "./EventInfo.module.scss";
import Icon from "@/components/Icon/Icon";
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  const formatShortDate = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const handleEditBtn = () => {
    const pathSegments = pathname.split("/").filter(Boolean);

    if (pathSegments.length > 1) {
      const eventId = pathSegments.pop();
      const newPath = `/${pathSegments.join("/")}/edit/${eventId}`;
      router.push(newPath);
    }
  };

  const handleDeleteBtn = () => {
    console.log("삭제하기 버튼 클릭");
  };

  return (
    <div className={styles.eventInfoContainer}>
      <Image
        src={process.env.NEXT_PUBLIC_FRONT_IMG + imgSrc}
        alt={`${title}포스터`}
        width={107}
        height={127}
        className={styles.eventInfoImg}
        unoptimized
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
        <div className={styles.eventInfoMode}>
          <p>{mode === "RESERVATION" ? "예약 시스템" : "대기 시스템"}</p>
          <div className={styles.eventInfoBtns}>
            <div onClick={handleEditBtn}>
              <Icon id="edit" />
            </div>
            <div onClick={handleDeleteBtn}>
              <Icon id="trash" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
