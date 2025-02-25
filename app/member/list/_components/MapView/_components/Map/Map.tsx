"use client";

import { useEffect, useRef } from "react";
import styles from "./Map.module.scss";

export default function Map() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.naver && mapRef.current) {
      // 현재 위치 가져오기
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (mapRef.current) {
            const map = new window.naver.maps.Map(mapRef.current, {
              center: new window.naver.maps.LatLng(latitude, longitude), // 현재 위치 중심
              zoom: 15,
            });

            // 현재 위치 마커 추가
            new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(latitude, longitude),
              map,
              title: "현재 위치",
            });
          }
        },
        (error) => {
          console.error("현재 위치를 가져올 수 없습니다.", error);
        }
      );
    }
  }, []);

  return <div className={styles.mapContainer} ref={mapRef}></div>;
}
