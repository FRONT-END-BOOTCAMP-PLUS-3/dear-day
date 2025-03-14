import Link from "next/link";
import styles from "./SmallCardView.module.scss";
import Image from "next/image";
import HeartButton from "@/components/Button/HeartButton/HeartButton";
import { usePathname } from "next/navigation";

interface SmallCardViewProps {
  id: number;
  imgSrc: string;
  title: string;
  starName: string;
  address: string;
  noLikeBtn?: boolean;
  overlay?: boolean;
  openDate?: string | Date;
  endDate?: string | Date;
}

const SmallCardView: React.FC<SmallCardViewProps> = ({
  id,
  imgSrc,
  title,
  starName,
  address,
  noLikeBtn,
  overlay,
  openDate,
  endDate,
}) => {
  const formatShortDate = (date?: string | Date): string => {
    if (!date) return "";
    const convertedDate = new Date(date);
    const year = convertedDate.getFullYear().toString();
    const month = String(convertedDate.getMonth() + 1).padStart(2, "0");
    const day = String(convertedDate.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const currentPath = usePathname();
  const pathSegments = (currentPath as string).split("/").filter(Boolean);
  // 기본적으로 현재 경로 유지
  let newPath = `/${pathSegments.join("/")}/${id}`;
  if (pathSegments.includes("mypage")) {
    newPath = `/${pathSegments.slice(0, pathSegments.indexOf("mypage")).join("/")}/event/${id}`;
  }

  return (
    <Link href={newPath}>
      <li className={styles.smallCardView}>
        <div className={styles.smallCardWrapper}>
          <Image
            className={styles.smallCardImg}
            src={imgSrc}
            alt={title}
            fill
          />
          {overlay && (
            <div className={styles.smallCardOverlay}>
              <p className={styles.smallCardOverlayText}>
                {formatShortDate(openDate)} ~ {formatShortDate(endDate)}
              </p>
            </div>
          )}
        </div>
        <div className={styles.smallCardContent}>
          <h3
            className={`${styles.smallCardTitle} ${!noLikeBtn ? styles.smallCardNoLike : ""}`}
          >
            {title}
          </h3>
          {!noLikeBtn && <HeartButton eventId={id} />}
        </div>
        <p className={styles.smallCardText}>
          {starName} · {address}
        </p>
      </li>
    </Link>
  );
};

export default SmallCardView;
