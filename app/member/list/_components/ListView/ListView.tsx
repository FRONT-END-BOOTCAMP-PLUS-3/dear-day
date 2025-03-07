"use client";

import Dropdown from "./Dropdown/Dropdown";
import ListItems from "./ListItems/ListItems";
import { ShowLikedStarDto } from "@/application/usecases/list/dto/ShowLikedStarDto";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";

interface ListViewProps {
  filteredEvents: ShowEventListDto[];
  likedStars: ShowLikedStarDto[];
  selectedStarId: string | number;
  setSelectedStarId: (id: string | number) => void;
}

export default function ListView({
  filteredEvents,
  likedStars,
  selectedStarId,
  setSelectedStarId,
}: ListViewProps) {
  return (
    <div>
      {/* Dropdown에서 선택한 옵션을 상태로 관리 */}
      <Dropdown
        selectedOption={selectedStarId} // 필터링된 스타의 아이디 받아옴
        onSelect={setSelectedStarId}
        likedStars={likedStars} // 찜한 스타 목록 전달
      />
      {/* 필터링된 리스트를 ListItems에 전달 */}
      <ListItems events={filteredEvents} />
    </div>
  );
}
