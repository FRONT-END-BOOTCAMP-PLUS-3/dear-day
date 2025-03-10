"use client";

import dynamic from "next/dynamic";
import Icon from "@/components/Icon/Icon";
import { ShowEventDetailDto } from "@/application/usecases/event/dto/ShowEventDetailDto";
import styles from "../../../../member/event/[event_id]/_components/LocationSection/LocationSection.module.scss";

// MapLoader를 클라이언트 사이드에서만 동적 로드
const MapLoader = dynamic(() => import("@/components/MapLoader/MapLoader"), {
  ssr: false, // 서버 사이드 렌더링 비활성화
});

interface Props {
  eventData: ShowEventDetailDto;
}

export default function ClientLocationSection({ eventData }: Props) {
  const address = eventData.address;

  // 클립보드 복사 함수
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      alert("주소가 복사되었습니다!");
    } catch (err) {
      console.error("복사 실패:", err);
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
        {/* SSR을 비활성화한 MapLoader 로드 */}
        <MapLoader markers={marker} />
      </div>
    </div>
  );
}
