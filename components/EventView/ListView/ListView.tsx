import Image from "next/image";
import styles from "./ListView.module.scss";
import Link from "next/link";
import HeartButton from "@/components/Button/HeartButton/HeartButton";

interface ListViewProps {
  id: number;
  mainImage: string;
  title: string;
  startDate: Date;
  endDate: Date;
  starName: string;
  address: string;
}

const ListView: React.FC<ListViewProps> = ({
  id,
  mainImage,
  title,
  startDate,
  endDate,
  starName,
  address,
}) => {
  const formatShortDate = (date: Date): string => {
    const year = date.getFullYear().toString(); // 두 자리 연도 (2024 → 24)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 두 자리 월 (1 → 01, 10 → 10)
    const day = String(date.getDate()).padStart(2, "0"); // 두 자리 일 (1 → 01, 10 → 10)

    return `${year}.${month}.${day}`;
  };

  return (
    <Link className={styles.listView} href={`/event/${id}`} passHref>
      <li className={styles.listItemContainer}>
        <div className={styles.listContent}>
          <Image src={mainImage} alt={title} width={78} height={100} />
          <div>
            <h3 className={styles.listTitle}>{title}</h3>
            <div className={styles.listText}>
              <p>
                <time dateTime={startDate.toISOString()}>
                  {formatShortDate(startDate)}
                </time>
                &nbsp;~&nbsp;
                <time dateTime={endDate.toISOString()}>
                  {formatShortDate(endDate)}
                </time>
              </p>
              <p>
                {starName} / {address}
              </p>
            </div>
          </div>
        </div>
        <HeartButton eventId={id} />
      </li>
    </Link>
  );
};

export default ListView;
