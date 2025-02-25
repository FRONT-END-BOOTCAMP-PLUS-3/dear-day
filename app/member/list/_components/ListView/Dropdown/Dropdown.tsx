"use client";

import { useState, useEffect } from "react";
import styles from "./Dropdown.module.scss";
import Icon from "@/components/Icon/Icon";

// API 데이터 타입 정의
interface Star {
  starId: number;
  stageName: string;
  group?: string | null;
}

interface DropdownProps {
  selectedOption: string | number; // string 또는 number로 변경
  onSelect: (option: string | number) => void; // string 또는 number 전달 가능
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

export default function Dropdown({ selectedOption, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  // 옵션 목록 구성
  const options = [
    { label: "전체", value: "전체" },
    ...(starOptions.length > 0
      ? [
          { label: "찜한 스타 전체", value: "찜한 스타 전체" },
          ...starOptions.map((star) => ({
            label: star.group
              ? `${star.stageName} (${star.group})`
              : star.stageName,
            value: star.starId, // ⭐ 선택 시 starId 전달
          })),
        ]
      : []),
  ];

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.dropdownToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((opt) => opt.value === selectedOption)?.label || "전체"}
        <span className={styles.icon}>
          <Icon id="arrow-down" />
        </span>
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map(({ label, value }) => (
            <li
              key={value}
              onClick={() => {
                onSelect(value);
                setIsOpen(false);
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
