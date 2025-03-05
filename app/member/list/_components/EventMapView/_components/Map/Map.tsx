"use client";

import { useEffect, useState } from "react";
import MapLoader from "@/components/MapLoader/MapLoader";
import styles from "./Map.module.scss";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";

interface MapProps {
  eventList: ShowEventListDto[];
  setMapBounds: (bounds: MapBounds) => void;
}

interface MapBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export default function Map({ eventList, setMapBounds }: MapProps) {
  const [markers, setMarkers] = useState<
    { latitude: number; longitude: number; mainImage: string }[]
  >([]);

  useEffect(() => {
    // 이벤트 데이터를 markers 배열로 변환
    const newMarkers = eventList.map((event) => ({
      latitude: event.latitude,
      longitude: event.longitude,
      mainImage: event.mainImage,
    }));

    setMarkers(newMarkers);
  }, [eventList]);

  return (
    <div className={styles.mapContainer}>
      <MapLoader markers={markers} setMapBounds={setMapBounds} />
    </div>
  );
}
