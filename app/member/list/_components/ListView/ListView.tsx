"use client";

import { useState } from "react";
import Dropdown from "./Dropdown/Dropdown";
import ListItems from "./ListItems/ListItems";
import { ShowLikedStarDto } from "@/application/usecases/list/dto/ShowLikedStarDto";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";

interface MapBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

interface ListViewProps {
  eventList: ShowEventListDto[];
  likedStars: ShowLikedStarDto[];
  mapBounds?: MapBounds | null;
}

export default function ListView({
  eventList,
  likedStars,
  mapBounds,
}: ListViewProps) {
  const [selectedStarId, setSelectedStarId] = useState<string | number>("전체");

  // 스타 ID -> 스타 이름 매핑 생성
  const starNames: Record<number, string> = likedStars.reduce(
    (acc, star) => {
      acc[star.starId] = star.stageName;
      return acc;
    },
    {} as Record<number, string>
  );

  // 선택한 스타 ID에 따라 이벤트 필터링
  let filteredEvents =
    selectedStarId === "전체" || selectedStarId === "찜한 스타 전체"
      ? eventList // 전체 보기
      : eventList.filter((event) => event.starId === selectedStarId);

  // (mapBounds가 입력된다 = 지도로 보기) 이니까 지도 범위 내에 있는 이벤트를 한 번 더 필터링 해줘야 함
  // mapBounds가 null이면 기본값 (서울 중심) 설정
  const activeMapBounds = mapBounds || {
    minLat: 37.45, // 서울 남쪽 경계
    maxLat: 37.65, // 서울 북쪽 경계
    minLng: 126.8, // 서울 서쪽 경계
    maxLng: 127.1, // 서울 동쪽 경계
  };
  if (mapBounds) {
    filteredEvents = filteredEvents.filter((event) => {
      return (
        event.latitude >= activeMapBounds.minLat &&
        event.latitude <= activeMapBounds.maxLat &&
        event.longitude >= activeMapBounds.minLng &&
        event.longitude <= activeMapBounds.maxLng
      );
    });
  }
  return (
    <div>
      {/* Dropdown에서 선택한 옵션을 상태로 관리 */}
      <Dropdown
        selectedOption={selectedStarId}
        onSelect={setSelectedStarId}
        likedStars={likedStars} // 찜한 스타 목록 전달
      />
      {/* 필터링된 리스트를 ListItems에 전달 */}
      <ListItems events={filteredEvents} starNames={starNames} />
    </div>
  );
}
