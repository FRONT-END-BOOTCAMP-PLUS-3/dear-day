"use client";

import { useState, useEffect } from "react";
import styles from "./LocationSearch.module.scss";
import SearchInput from "@/components/Input/SearchInput/SearchInput";
import { useRegisterEventStore } from "@/store/registerEventStore";
import Icon from "@/components/Icon/Icon";

// 네이버 API 응답 타입 정의
interface NaverPlace {
  title: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
}

// 변환된 장소 데이터 타입
interface LocationData {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface LocationSearchProps {
  value: LocationData;
  onChange: (value: LocationData) => void;
}

const LocationSearch = ({ value, onChange }: LocationSearchProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const { updateEventData } = useRegisterEventStore();
  const [inputText, setInputText] = useState(value.placeName);

  useEffect(() => {
    setInputText(value.placeName);
  }, [value.placeName]);

  const handleInputChange = async (newPlaceName: string) => {
    setInputText(newPlaceName);
    if (newPlaceName.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ placeName: newPlaceName }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ 검색 요청 실패:", response.status, errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${errorText}`
        );
      }

      const data: { places: NaverPlace[] } = await response.json();

      if (data.places) {
        setSearchResults(
          data.places.map((place) => ({
            placeName: place.title.replace(/<[^>]+>/g, ""),
            address: place.roadAddress,
            latitude: parseFloat(place.mapy),
            longitude: parseFloat(place.mapx),
          }))
        );
      } else {
        console.warn("⚠️ 검색 결과 없음!");
      }
    } catch (error) {
      console.error("❌ 장소 검색 실패:", error);
    }
  };

  const handleSelectLocation = (place: LocationData) => {
    onChange({
      placeName: place.placeName,
      address: place.address,
      latitude: place.latitude,
      longitude: place.longitude,
    });

    updateEventData({
      placeName: place.placeName,
      address: place.address,
      latitude: place.latitude,
      longitude: place.longitude,
    });

    setInputText(place.placeName);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.addressSearchContainer}>
      <SearchInput
        value={inputText}
        onChange={() => {}}
        onFocus={() => setIsModalOpen(true)}
        placeholder="장소를 검색하세요"
      />

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="장소 검색"
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              className={styles.searchInput}
              disabled={false}
              readOnly={false}
            />
            {searchResults.length > 0 && (
              <ul className={styles.resultList}>
                {searchResults.map((place) => (
                  <li
                    key={place.address}
                    onClick={() => handleSelectLocation(place)}
                  >
                    <strong>{place.placeName}</strong>
                    <br />
                    <small>{place.address}</small>
                  </li>
                ))}
              </ul>
            )}
            <button
              className={styles.close}
              onClick={() => setIsModalOpen(false)}
            >
              <Icon id="close" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
