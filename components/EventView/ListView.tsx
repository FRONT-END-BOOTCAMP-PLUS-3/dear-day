import Image from "next/image";
import Icon from "../Icon/Icon";
import styles from "./ListView.module.scss";
import Link from "next/link";

interface ListViewProps {
  id: number;
  imgSrc: string;
  title: string;
  startDate: Date;
  endDate: Date;
  starName: string;
  address: string;
  liked: boolean;
}

const ListView: React.FC<ListViewProps> = ({
  id,
  imgSrc,
  title,
  startDate,
  endDate,
  starName,
  address,
  liked,
}) => {
  return (
    <Link className={styles.listView} href={`/event/${id}`} passHref>
      <li className={styles.listItemContainer}>
        <div className={styles.listContent}>
          <Image src={imgSrc} alt="poster" width={78} height={100} />
          <div>
            <h3 className={styles.listTitle}>{title}</h3>
            <div className={styles.listText}>
              <p>
                <time dateTime={startDate.toISOString()}>
                  {startDate.toLocaleDateString("ko-KR")}
                </time>
                ~{" "}
                <time dateTime={startDate.toISOString()}>
                  {" "}
                  {endDate.toLocaleDateString("ko-KR")}
                </time>
              </p>
              <p>
                {starName} / {address}
              </p>
            </div>
          </div>
        </div>
        <Icon id="heart" />
      </li>
    </Link>
  );
};

export default ListView;
