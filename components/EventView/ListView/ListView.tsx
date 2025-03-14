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
  stageName: string;
  group?: string | null;
  address: string;
  currentPath: string; // 현재 경로를 부모에서 전달받음
}

const ListView: React.FC<ListViewProps> = ({
  id,
  mainImage,
  title,
  startDate,
  endDate,
  stageName,
  group,
  address,
  currentPath,
}) => {
  const formatShortDate = (date: Date): string => {
    const fixedDate = new Date(date);
    fixedDate.setTime(fixedDate.getTime() - 9 * 60 * 60 * 1000);

    const year = fixedDate.getFullYear().toString();
    const month = String(fixedDate.getMonth() + 1).padStart(2, "0");
    const day = String(fixedDate.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  const pathSegments = currentPath.split("/").filter(Boolean); // 빈 문자열 제거

  // 마지막 요소(id) 제거
  pathSegments.pop();

  // `member`가 포함된 경우, `/member`까지만 유지
  let newBasePath = `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_PORT}`;
  if (pathSegments.includes("member")) {
    newBasePath = `/${pathSegments.slice(0, pathSegments.indexOf("member") + 1).join("/")}`;
  }

  // 최종 경로 설정 (루트 또는 `/member`까지만 유지하고 `event/id` 추가)
  const newPath = `${newBasePath}/event/${id}`;

  return (
    <Link className={styles.listView} href={newPath} passHref>
      <li className={styles.listItemContainer}>
        <div className={styles.listContent}>
          <Image
            src={process.env.NEXT_PUBLIC_FRONT_IMG + mainImage}
            alt={title}
            width={78}
            height={100}
            unoptimized
          />
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
                {group ? `${stageName} (${group})` : `${stageName}`} /{" "}
                {address.split(" ").slice(0, 2).join(" ")}
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
