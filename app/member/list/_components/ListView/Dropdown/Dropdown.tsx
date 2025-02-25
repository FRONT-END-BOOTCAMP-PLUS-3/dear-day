"use client";

import { useState, useEffect } from "react";
import styles from "./Dropdown.module.scss";
import Icon from "@/components/Icon/Icon";

// API 데이터 타입 정의
interface Star {
  starId: number;
  stageName: string;
  group?: string | null; // 그룹이 있을 수도, 없을 수도 있음
}

// Mock API 함수 (실제 API 요청으로 대체 가능)
const fetchFavoriteStars = async (): Promise<Star[]> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { starId: 1, stageName: "아이유", group: null },
          { starId: 2, stageName: "뷔", group: "BTS" },
          { starId: 3, stageName: "지수", group: "BLACKPINK" },
        ]),
      500
    )
  );
};

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("전체");
  const [starOptions, setStarOptions] = useState<Star[]>([]);

  useEffect(() => {
    const getStars = async () => {
      try {
        const stars = await fetchFavoriteStars();
        setStarOptions(stars);
      } catch (error) {
        console.error("찜한 스타 목록을 가져오는 중 오류 발생:", error);
      }
    };
    getStars();
  }, []);

  // 옵션 목록 구성 (기본 "전체" + 찜한 스타가 있으면 "찜한 스타 전체" 추가)
  const options = [
    "전체",
    ...(starOptions.length > 0
      ? [
          "찜한 스타 전체",
          ...starOptions.map((star) =>
            star.group ? `${star.stageName} (${star.group})` : star.stageName
          ),
        ]
      : []),
  ];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); // 선택 후 닫기
  };

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.dropdownToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
        <span className={styles.icon}>
          <Icon id="arrow-down" />
        </span>
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
