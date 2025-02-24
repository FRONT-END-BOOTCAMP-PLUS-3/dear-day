import Link from "next/link";
import styles from "./CourseDetailListView.module.scss";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";

interface CourseDetailListViewProps {
  index: number;
  id: number;
  imgSrc: string;
  title: string;
  startDate: Date;
  endDate: Date;
  starName: string;
}

const CourseDetailListView: React.FC<CourseDetailListViewProps> = ({
  index,
  id,
  imgSrc,
  title,
  startDate,
  endDate,
  starName,
}) => {
  const formatShortDate = (date: Date): string => {
    const year = date.getFullYear().toString(); // 두 자리 연도 (2024 → 24)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 두 자리 월 (1 → 01, 10 → 10)
    const day = String(date.getDate()).padStart(2, "0"); // 두 자리 일 (1 → 01, 10 → 10)

    return `${year}.${month}.${day}`;
  };

  return (
    <div className={styles.courseDetailContainer}>
      <div className={styles.courseDetailIndex}>{index}</div>

      <Link href={`/course/${id}`}>
        <li className={styles.courseDetailView}>
          <Image
            className={styles.courseDetailImg}
            src={imgSrc}
            alt={title}
            width={56}
            height={56}
          />
          <div className={styles.courseDetailContent}>
            <div className={styles.courseDetailText}>
              <div className={styles.courseDetailHeader}>
                <p className={styles.courseDetailStarName}>{starName}</p>
                <h3 className={styles.courseDetailTitle}>{title}</h3>
              </div>
              <p className={styles.courseDetailTime}>
                <time dateTime={startDate.toISOString()}>
                  {formatShortDate(startDate)}
                </time>
                &nbsp;~&nbsp;
                <time dateTime={endDate.toISOString()}>
                  {formatShortDate(endDate)}
                </time>
              </p>
            </div>
            <div className={styles.courseDetailMoveIcon}>
              <Icon id="hamburger" />
            </div>
          </div>
        </li>
      </Link>
    </div>
  );
};

export default CourseDetailListView;
