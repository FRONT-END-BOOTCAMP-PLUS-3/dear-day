import Link from "next/link";
import styles from "./LargeCardView.module.scss";
import Image from "next/image";

interface LargeCardViewProps {
  id: number;
  imgSrc: string;
  title: string;
  startDate: Date;
  endDate: Date;
  starName: string;
  address: string;
}

const LargeCardView: React.FC<LargeCardViewProps> = ({
  id,
  imgSrc,
  title,
  startDate,
  endDate,
  starName,
  address,
}) => {
  const formatShortDate = (date: Date): string => {
    const year = date.getFullYear().toString().slice(2); // 두 자리 연도 (2024 → 24)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 두 자리 월 (1 → 01, 10 → 10)
    const day = String(date.getDate()).padStart(2, "0"); // 두 자리 일 (1 → 01, 10 → 10)

    return `${year}.${month}.${day}`;
  };

  return (
    <Link href={`/event/${id}`}>
      <li className={styles.LargeCardView}>
        <Image
          className={styles.LargeCardImg}
          src={imgSrc}
          alt={title}
          width={106}
          height={128}
        />
        <div className={styles.LargeCardContent}>
          <h3 className={styles.LargeCardTitle}>{title}</h3>
          <div className={styles.LargeCardText}>
            <p className={styles.LargeCardTime}>
              <time dateTime={startDate.toISOString()}>
                {formatShortDate(startDate)}
              </time>
              <span>&nbsp;~&nbsp;</span>
              <time
                className={styles.LargeCardEndTime}
                dateTime={endDate.toISOString()}
              >
                {formatShortDate(endDate)}
              </time>
            </p>
            <p className={styles.LargeCardNameLocation}>
              {starName} /
              <span className={styles.LargeCardLocation}>&nbsp;{address}</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default LargeCardView;
