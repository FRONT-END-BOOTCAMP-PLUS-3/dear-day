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

      // ✅ 모든 마커들의 중심 좌표 계산
      const totalLat = markers.reduce(
        (sum, marker) => sum + marker.latitude,
        0
      );
      const totalLng = markers.reduce(
        (sum, marker) => sum + marker.longitude,
        0
      );
      const centerLat = totalLat / markers.length;
      const centerLng = totalLng / markers.length;
      const centerPosition = new window.naver.maps.LatLng(centerLat, centerLng);

      // ✅ 첫 번째 마커를 기준으로 LatLngBounds 초기화
      const bounds = new window.naver.maps.LatLngBounds(
        new window.naver.maps.LatLng(markers[0].latitude, markers[0].longitude),
        new window.naver.maps.LatLng(markers[0].latitude, markers[0].longitude)
      );

      markers.forEach(({ latitude, longitude, mainImage }) => {
        const position = new window.naver.maps.LatLng(latitude, longitude);
        bounds.extend(position); // ✅ 경계 확장 (마커들을 포함하도록)

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

      // ✅ 마커를 먼저 추가한 후 일정 시간 후에 `fitBounds()` 실행
      setTimeout(() => {
        if (markers.length > 1) {
          map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
        } else {
          // ✅ 마커가 1개만 있을 경우 중심을 마커 위치로 설정하고 적절한 줌 레벨 유지
          map.setCenter(centerPosition);
          map.setZoom(16);
        }
      }, 300); // ✅ 300ms 딜레이 후 실행 (렌더링 안정화)
    }
  }, [markers]);

  return <div className={styles.mapContainer} ref={mapRef}></div>;
}
