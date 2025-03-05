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

interface MapBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

interface MapLoaderProps {
  markers: MarkerData[];
  setMapBounds?: (bounds: MapBounds) => void; // 선택적 인자
}

export default function MapLoader({ markers, setMapBounds }: MapLoaderProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.naver && mapRef.current) {
      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(
          markers[0]?.latitude || 37.5665,
          markers[0]?.longitude || 126.978
        ), // 기본 중심 좌표 (서울)
        zoom: 15,
      });

      const bounds = new window.naver.maps.LatLngBounds(
        new window.naver.maps.LatLng(
          markers[0]?.latitude || 37.5665,
          markers[0]?.longitude || 126.978
        ),
        new window.naver.maps.LatLng(
          markers[0]?.latitude || 37.5665,
          markers[0]?.longitude || 126.978
        )
      );

      markers.forEach(({ latitude, longitude, mainImage }) => {
        const position = new window.naver.maps.LatLng(latitude, longitude);
        bounds.extend(position);

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

      if (markers.length > 1) {
        map.fitBounds(bounds);
      }

      // ⭐ 지도 범위가 변경될 때 `setMapBounds`가 존재하면 실행
      if (setMapBounds) {
        window.naver.maps.Event.addListener(map, "bounds_changed", () => {
          const bounds = map.getBounds() as unknown as naver.maps.LatLngBounds;

          const newBounds: MapBounds = {
            minLat: bounds.getSW().y, // 남서쪽 위도
            maxLat: bounds.getNE().y, // 북동쪽 위도
            minLng: bounds.getSW().x, // 남서쪽 경도
            maxLng: bounds.getNE().x, // 북동쪽 경도
          };

          setMapBounds(newBounds);
        });
      }
    }
  }, [markers, setMapBounds]);

  return <div className={styles.mapContainer} ref={mapRef}></div>;
}
