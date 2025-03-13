"use client";

import Icon from "@/components/Icon/Icon";
import { ShowEventDetailDto } from "@/application/usecases/event/dto/ShowEventDetailDto";
import styles from "./LocationSection.module.scss";
import MapLoader from "@/components/MapLoader/MapLoader";

interface Props {
  eventData: ShowEventDetailDto;
}

export default function LocationSection({ eventData }: Props) {
  const address = eventData.address;

  // ✅ 클립보드 복사 함수
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      alert("주소가 복사되었습니다!");
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 주소 복사 실패:", err);
      }
      alert("주소 복사에 실패했습니다.");
    }
  };

  const marker = [
    {
      latitude: eventData.latitude,
      longitude: eventData.longitude,
      mainImage: eventData.mainImage,
    },
  ];

  return (
    <div className={styles.locationSection}>
      <div className={styles.title}>
        <h3>위치</h3>
        <div className={styles.address}>
          <p>{address}</p>
          <button onClick={handleCopy}>
            <Icon id="copy" size={20} />
          </button>
        </div>
      </div>
      <div className={styles.mapSection}>
        <MapLoader markers={marker} />
      </div>
    </div>
  );
}
