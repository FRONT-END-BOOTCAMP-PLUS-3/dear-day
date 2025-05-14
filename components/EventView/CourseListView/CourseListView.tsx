import Link from "next/link";
import styles from "./CourseListView.module.scss";
import Image from "next/image";
import { useHeaderStore } from "@/store/HeaderStore";

export interface CourseListViewProps {
  id: number;
  imgSrc: string;
  name: string;
  date: Date;
  createAt?: Date;
  eventCount: number;
  isPast?: boolean;
}

const CourseListView: React.FC<CourseListViewProps> = ({
  id,
  imgSrc,
  name,
  date,
  eventCount,
  isPast = false,
}) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const { setTitle } = useHeaderStore();

  if (!dateObj) {
    return null;
  }

  const handleClick = () => {
    setTitle(name); // 선택한 코스의 이름을 헤더 제목으로 설정
  };

  return (
    // 여기서 name도 전달해야 함
    <Link href={`/member/course/${id}`} onClick={handleClick}>
      <li
        className={isPast ? styles.pastCourseListView : styles.courseListView}
      >
        <Image
          className={styles.courseListImg}
          src={process.env.NEXT_PUBLIC_FRONT_IMG + imgSrc}
          alt={name}
          width={56}
          height={56}
          unoptimized
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
