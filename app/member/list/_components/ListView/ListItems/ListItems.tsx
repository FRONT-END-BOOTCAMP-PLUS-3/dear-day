"use client";

import { useEffect, useState } from "react";
import ScrollCardContainer from "@/components/CardContainer/ScrollCardContainer";
import ListView from "@/components/EventView/ListView/ListView";

interface ListItem {
  id: number;
  imgSrc: string;
  title: string;
  startDate: Date;
  endDate: Date;
  starId: number;
  address: string;
}

interface ListItemsProps {
  filter: string | number;
}

// ⭐ 특정 starId로 starName을 가져오는 API 요청 (Mock API)
const fetchStarName = async (starId: number): Promise<string | null> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const starMapping: Record<number, string> = {
        1: "아이유",
        2: "뷔",
        3: "지수",
        4: "NCT",
      };
      resolve(starMapping[starId] || null);
    }, 500)
  );
};

// Mock 데이터 (API 호출로 대체 가능)
const mockData: ListItem[] = [
  {
    id: 1,
    imgSrc: "/img/sample1.jpg",
    title: "아이유 팬미팅",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-06-02"),
    starId: 1,
    address: "서울 강남구",
  },
  {
    id: 2,
    imgSrc: "/img/sample2.jpg",
    title: "BTS 콘서트",
    startDate: new Date("2024-07-15"),
    endDate: new Date("2024-07-16"),
    starId: 2,
    address: "잠실 올림픽경기장",
  },
  {
    id: 3,
    imgSrc: "/img/sample3.jpg",
    title: "BLACKPINK 팬사인회",
    startDate: new Date("2024-08-10"),
    endDate: new Date("2024-08-11"),
    starId: 3,
    address: "서울 마포구",
  },
  {
    id: 4,
    imgSrc: "/img/sample4.jpg",
    title: "팬미팅",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-09-02"),
    starId: 4,
    address: "코엑스",
  },
];

export default function ListItems({ filter }: ListItemsProps) {
  const [filteredList, setFilteredList] = useState<ListItem[]>(mockData);
  const [starNames, setStarNames] = useState<Record<number, string>>({});

  // ⭐ starId를 starName으로 변환하는 로직
  useEffect(() => {
    const fetchStarNames = async () => {
      const uniqueStarIds = [...new Set(mockData.map((item) => item.starId))];
      const starNameMap: Record<number, string> = {};

      for (const starId of uniqueStarIds) {
        const name = await fetchStarName(starId);
        if (name) {
          starNameMap[starId] = name;
        }
      }

      setStarNames(starNameMap);
    };

    fetchStarNames();
  }, []);

  // ⭐ 선택한 스타 목록에 맞게 데이터 필터링하는 로직
  useEffect(() => {
    if (!Object.keys(starNames).length) return;

    if (filter === "전체" || filter === "찜한 스타 전체") {
      setFilteredList(mockData);
    } else if (typeof filter === "number") {
      const starName = starNames[filter];
      if (starName) {
        setFilteredList(
          mockData.filter((item) => starNames[item.starId] === starName)
        );
      } else {
        setFilteredList([]);
      }
    } else {
      setFilteredList(
        mockData.filter((item) => starNames[item.starId] === filter)
      );
    }
  }, [filter, starNames]);

  return (
    <ScrollCardContainer variant="list">
      <ul>
        {filteredList.length > 0 ? (
          filteredList.map((item) => (
            <ListView
              key={item.id}
              {...item}
              starName={starNames[item.starId] || "알 수 없음"}
            />
          ))
        ) : (
          <p>선택한 항목에 대한 결과가 없습니다.</p>
        )}
      </ul>
    </ScrollCardContainer>
  );
}
