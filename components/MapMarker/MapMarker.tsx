"use client";

import styles from "./MapMarker.module.scss";
import Image from "next/image";

const MapMarker = ({ mainImage }: { mainImage: string }) => {
  return (
    <div className={styles.markerImageWrap}>
      <div className={styles.markerImage}>
        <Image src={mainImage} alt={mainImage} width={30} height={30} />
      </div>
    </div>
  );
};

export default MapMarker;
