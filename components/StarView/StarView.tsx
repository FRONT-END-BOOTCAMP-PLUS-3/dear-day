import styles from "./StarView.module.scss";
import Image from "next/image";

interface StarViewProps {
  starImage: string;
  starName: string;
}

const StarView = ({ starImage, starName }: StarViewProps) => {
  return (
    <div className={styles.starViewContainer}>
      <div className={styles.starImage}>
        <Image src={starImage} alt={starName} fill className={styles.image} />
      </div>
      <p className={styles.starName}>{starName}</p>
    </div>
  );
};

export default StarView;
