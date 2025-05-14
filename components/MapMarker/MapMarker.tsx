"use client";

import styles from "./MapMarker.module.scss";
import Image from "next/image";

const MapMarker = ({
  mainImage,
  index,
  isCourse,
}: {
  mainImage: string;
  index?: number;
  isCourse?: boolean;
}) => {
  return (
    <div className={styles.markerImageWrap}>
      <div
        className={`${styles.markerImage} ${isCourse ? styles.hasIndex : ""}`}
      >
        {/* ✅ 숫자 추가 */}
        {isCourse && <span className={styles.indexNumber}>{index}</span>}

        {/* ✅ 이미지 */}
        <Image
          src={process.env.NEXT_PUBLIC_FRONT_IMG + mainImage}
          alt="Marker"
          width={30}
          height={30}
          unoptimized
        />
      </div>
    </div>
  );
};

export default MapMarker;
