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
    const fixedDate = new Date(date);
    fixedDate.setTime(fixedDate.getTime() - 9 * 60 * 60 * 1000);

    const year = fixedDate.getFullYear().toString();
    const month = String(fixedDate.getMonth() + 1).padStart(2, "0");
    const day = String(fixedDate.getDate()).padStart(2, "0");

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
                <time dateTime={new Date(startDate).toDateString()}>
                  {formatShortDate(new Date(startDate))}
                </time>
                &nbsp;~&nbsp;
                <time dateTime={new Date(endDate).toDateString()}>
                  {formatShortDate(new Date(endDate))}
                </time>
              </p>
              <p>
                {starName} / {address.split(" ").slice(0, 2).join(" ")}
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
