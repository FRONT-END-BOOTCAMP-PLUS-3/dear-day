"use client";

import { useState } from "react";
import styles from "./Dropdown.module.scss";
import Icon from "@/components/Icon/Icon";
import { ShowLikedStarDto } from "@/application/usecases/list/dto/ShowLikedStarDto";

interface DropdownProps {
  selectedOption: string | number;
  onSelect: (value: string | number) => void;
  likedStars: ShowLikedStarDto[];
}

export default function Dropdown({
  selectedOption,
  onSelect,
  likedStars,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 옵션 목록 구성
  const options = [
    { label: "전체", value: "전체" },
    ...(likedStars.length > 0
      ? [
          { label: "찜한 스타 전체", value: "찜한 스타 전체" },
          ...likedStars.map((star) => ({
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
