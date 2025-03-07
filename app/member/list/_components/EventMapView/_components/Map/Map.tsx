"use client";

import { useEffect, useState } from "react";
import MapLoader from "@/components/MapLoader/MapLoader";
import styles from "./Map.module.scss";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";

interface MapProps {
  filteredEvents?: ShowEventListDto[]; // ✅ filteredEvents를 선택적(`?`)으로 설정
}

export default function Map({ filteredEvents = [] }: MapProps) {
  const [markers, setMarkers] = useState<
    { latitude: number; longitude: number; mainImage: string }[]
  >([]);

  useEffect(() => {
    if (!filteredEvents || filteredEvents.length === 0) {
      setMarkers([]); // ✅ filteredEvents가 빈 배열이면 markers도 빈 배열로 설정
      return;
    }
    // 이벤트 데이터를 markers 배열로 변환
    const newMarkers = filteredEvents.map((event) => ({
      latitude: event.latitude,
      longitude: event.longitude,
      mainImage: event.mainImage,
    }));

    setMarkers(newMarkers);
  }, [filteredEvents]);

  return (
    <div className={styles.mapContainer}>
      <MapLoader markers={markers} />
    </div>
  );
}
