import Image from "next/image";
import styles from "./StarView.module.scss";
import { useRouter } from "next/navigation";

interface StarViewProps {
  starId: number;
  starImage: string;
  starName: string;
}

const StarView = ({ starId, starImage, starName }: StarViewProps) => {
  const router = useRouter();
  const handleStar = () => {
    router.push(`/member/search_star/${starId}`);
  };
  return (
    <div className={styles.starViewContainer} onClick={handleStar}>
      <div className={styles.starImage}>
        <Image src={starImage} alt={starName} fill className={styles.image} />
      </div>
      <p className={styles.starName}>{starName}</p>
    </div>
  );
};

export default StarView;
