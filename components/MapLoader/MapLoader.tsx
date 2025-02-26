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
      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(
          markers[0].latitude,
          markers[0].longitude
        ), // 첫 번째 마커를 기준으로 지도 중심 설정
        zoom: 15,
      });

      const bounds =
        markers.length > 1
          ? new window.naver.maps.LatLngBounds(
              new window.naver.maps.LatLng(
                markers[0].latitude,
                markers[0].longitude
              ),
              new window.naver.maps.LatLng(
                markers[0].latitude,
                markers[0].longitude
              )
            )
          : null; // 모든 마커를 포함하는 영역 설정

      markers.forEach(({ latitude, longitude, mainImage }) => {
        const position = new window.naver.maps.LatLng(latitude, longitude);
        bounds?.extend(position); // 모든 마커를 포함하는 경계를 확장

        // HTML 요소 생성 후 React 마운트
        const markerElement = document.createElement("div");
        const root = createRoot(markerElement);
        root.render(<MapMarker mainImage={mainImage} />);

        new window.naver.maps.Marker({
          position,
          map,
          icon: {
            content: markerElement, // `MapMarker` 컴포넌트로 커스텀 마커 적용
            size: new window.naver.maps.Size(30, 30),
            anchor: new window.naver.maps.Point(15, 15), // 마커 중앙 정렬
          },
        });
      });

      if (bounds && markers.length > 1) {
        map.fitBounds(bounds);
      }
    }
  }, [markers]);

  return <div className={styles.mapContainer} ref={mapRef}></div>;
}
