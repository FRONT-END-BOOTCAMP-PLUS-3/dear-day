import Image from "next/image";
import styles from "./StarView.module.scss";

interface StarViewProps {
  starImage: string;
  starName: string;
}

const StarView = ({ starImage, starName }: StarViewProps) => {
  return (
    <div className={styles.starViewContainer}>
      <div className={styles.starImage}>
        <Image
          src={process.env.NEXT_PUBLIC_FRONT_SRC + starImage}
          alt={starName}
          fill
          className={styles.image}
        />
      </div>
      <p className={styles.starName}>{starName}</p>
    </div>
  );
};

export default StarView;
