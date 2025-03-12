"use client";

import styles from "./MapMarker.module.scss";
import Image from "next/image";

const MapMarker = ({
  mainImage,
  index,
  iscourse,
}: {
  mainImage: string;
  index?: number;
  iscourse?: boolean;
}) => {
  return (
    <div className={styles.markerImageWrap}>
      <div
        className={`${styles.markerImage} ${iscourse ? styles.hasIndex : ""}`}
      >
        {/* ✅ 숫자 추가 */}
        {iscourse && <span className={styles.indexNumber}>{index}</span>}

        {/* ✅ 이미지 */}
        <Image src={mainImage} alt="Marker" width={30} height={30} />
      </div>
    </div>
  );
};

export default MapMarker;
