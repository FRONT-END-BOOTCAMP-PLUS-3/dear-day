"use client";

import { useState } from "react";
import styles from "./LocationSearch.module.scss";
import SearchInput from "@/components/Input/SearchInput/SearchInput";
import { useRegisterEventStore } from "@/store/registerEventStore";

// ✅ 장소 데이터 타입 정의
interface LocationData {
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

  // ✅ 입력할 때마다 검색 실행
  const handleInputChange = async (newAddress: string) => {
    onChange({ ...value, address: newAddress });

    if (newAddress.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    console.log("🔍 검색 요청 데이터:", { placeName: newAddress }); // ✅ 입력값 확인

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ placeName: newAddress }),
      });

      console.log("🔍 검색 요청 URL:", response.url); // ✅ 요청 URL 확인
      console.log("📡 응답 상태 코드:", response.status); // ✅ 응답 상태 확인

      if (!response.ok) {
        const errorText = await response.text(); // ✅ 서버 에러 메시지 확인
        console.error("❌ 검색 요청 실패:", response.status, errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("✅ 검색 결과:", data);

      if (data.places) {
        setSearchResults(data.places);
      } else {
        console.warn("⚠️ 검색 결과가 없음!");
      }
    } catch (error) {
      console.error("❌ 장소 검색 실패:", error);
    }
  };

  const handleSelectLocation = (place: LocationData) => {
    console.log("📍 선택된 장소:", place); // ✅ 선택한 장소 정보 확인
    onChange(place);
    updateEventData(place);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.addressSearchContainer}>
      <SearchInput
        value={value.address}
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
              value={value.address}
              onChange={(e) => handleInputChange(e.target.value)}
              className={styles.searchInput}
            />
            {searchResults.length > 0 && (
              <ul className={styles.resultList}>
                {searchResults.map((place) => (
                  <li
                    key={place.address}
                    onClick={() => handleSelectLocation(place)}
                  >
                    {place.address}
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
