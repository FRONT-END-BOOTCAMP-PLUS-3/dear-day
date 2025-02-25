import Link from "next/link";
import styles from "./CourseListView.module.scss";
import Image from "next/image";

export interface CourseListViewProps {
  id: number;
  imgSrc: string;
  title: string;
  createAt: Date;
  count: number;
}

const CourseListView: React.FC<CourseListViewProps> = ({
  id,
  imgSrc,
  title,
  createAt,
  count,
}) => {
  return (
    <Link href={`/course/${id}`}>
      <li className={styles.courseListView}>
        <Image
          className={styles.courseListImg}
          src={imgSrc}
          alt={title}
          width={56}
          height={56}
        />
        <div className={styles.courseListContent}>
          <div className={styles.courseListText}>
            <h3 className={styles.courseListTitle}>{title}</h3>
            <p className={styles.courseListTime}>
              <time dateTime={createAt.toISOString()}>
                {createAt.toLocaleDateString("ko-KR")}
              </time>
            </p>
          </div>
          <div className={styles.courseCount}>
            <span>🎂</span>
            <span>{count}</span>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default CourseListView;
