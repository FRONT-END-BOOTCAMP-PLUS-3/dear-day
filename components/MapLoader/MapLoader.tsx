"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import styles from "./MapLoader.module.scss";
import MapMarker from "../MapMarker/MapMarker";

interface MarkerData {
  latitude: number;
  longitude: number;
  mainImage: string;
}

interface MapLoaderProps {
  markers: MarkerData[];
}

export default function MapLoader({ markers }: MapLoaderProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.naver && mapRef.current) {
      // 마커가 없을 경우 기본 위치 (서울)
      const defaultCenter = new window.naver.maps.LatLng(37.5665, 126.978);

      const map = new window.naver.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 15,
      });

      if (markers.length === 0) {
        return;
      }

      // 모든 마커 포함하는 `bounds`

      markers.forEach(({ latitude, longitude, mainImage }) => {
        const position = new window.naver.maps.LatLng(latitude, longitude);

        // HTML 요소 생성 후 React 마운트
        const markerElement = document.createElement("div");
        const root = createRoot(markerElement);
        root.render(<MapMarker mainImage={mainImage} />);

        new window.naver.maps.Marker({
          position,
          map,
          icon: {
            content: markerElement,
            size: new window.naver.maps.Size(30, 30),
            anchor: new window.naver.maps.Point(15, 15),
          },
        });
      });
    }
  }, [markers]);

  return <div className={styles.mapContainer} ref={mapRef}></div>;
}
