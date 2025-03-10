import Link from "next/link";
import styles from "./CourseListView.module.scss";
import Image from "next/image";

export interface CourseListViewProps {
  id: number;
  imgSrc: string;
  name: string;
  date: Date;
  createAt?: Date;
  eventCount: number;
}

const CourseListView: React.FC<CourseListViewProps> = ({
  id,
  imgSrc,
  name,
  date,
  eventCount,
}) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (!dateObj) {
    return null;
  }

  return (
    <Link href={`/member/course/${id}`}>
      <li className={styles.courseListView}>
        <Image
          className={styles.courseListImg}
          src={imgSrc}
          alt={name}
          width={56}
          height={56}
        />
        <div className={styles.courseListContent}>
          <div className={styles.courseListText}>
            <h3 className={styles.courseListTitle}>{name}</h3>
            <p className={styles.courseListTime}>
              <time dateTime={dateObj.toISOString()}>
                {dateObj.toLocaleDateString("ko-KR")}
              </time>
            </p>
          </div>
          <div className={styles.courseCount}>
            <span>🎂</span>
            <span>{eventCount}</span>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default CourseListView;
