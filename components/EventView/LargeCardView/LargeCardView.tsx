import Link from "next/link";
import styles from "./LargeCardView.module.scss";
import Image from "next/image";

interface LargeCardViewProps {
  id: number;
  mainImage: string;
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  starName: string;
  address: string;
  readOnly?: boolean;
  isPast?: boolean;
}

const LargeCardView: React.FC<LargeCardViewProps> = ({
  id,
  mainImage,
  title,
  startDate,
  endDate,
  starName,
  address,
  readOnly = false,
  isPast = false,
}) => {
  const startDateObj =
    typeof startDate === "string" ? new Date(startDate) : startDate;
  const endDateObj = typeof endDate === "string" ? new Date(endDate) : endDate;

  const formatShortDate = (date: Date): string => {
    const year = date.getFullYear().toString().slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  const cardContent = (
    <li className={isPast ? styles.pastLargeCardView : styles.LargeCardView}>
      <Image
        className={styles.LargeCardImg}
        src={mainImage}
        alt={title}
        width={106}
        height={128}
      />
      <div className={styles.LargeCardContent}>
        <h3 className={styles.LargeCardTitle}>{title}</h3>
        <div className={styles.LargeCardText}>
          <p className={styles.LargeCardTime}>
            <time dateTime={startDateObj.toISOString()}>
              {formatShortDate(startDateObj)}
            </time>
            <span>&nbsp;~&nbsp;</span>
            <time dateTime={endDateObj.toISOString()}>
              {formatShortDate(endDateObj)}
            </time>
          </p>
          <p className={styles.LargeCardNameLocation}>
            {starName} /
            <span className={styles.LargeCardLocation}>&nbsp;{address}</span>
          </p>
        </div>
      </div>
    </li>
  );

  return readOnly ? (
    cardContent
  ) : (
    <Link href={`/member/event/${id}`}>{cardContent}</Link>
  );
};

export default LargeCardView;
