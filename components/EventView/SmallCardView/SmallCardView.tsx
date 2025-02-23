import Link from "next/link";
import styles from "./SmallCardView.module.scss";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";

interface SmallCardViewProps {
  id: number;
  imgSrc: string;
  title: string;
  starName: string;
  address: string;
  liked: boolean;
}

const SmallCardView: React.FC<SmallCardViewProps> = ({
  id,
  imgSrc,
  title,
  starName,
  address,
  liked,
}) => {
  return (
    <Link href={`/event/${id}`}>
      <li className={styles.smallCardView}>
        <Image
          className={styles.smallCardImg}
          src={imgSrc}
          alt={title}
          width={0}
          height={0}
        />
        <div className={styles.smallCardContent}>
          <h3 className={styles.smallCardTitle}>{title}</h3>
          <Icon id="heart" />
        </div>
        <p className={styles.smallCardText}>
          {starName} · {address}
        </p>
      </li>
    </Link>
  );
};

export default SmallCardView;
