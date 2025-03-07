"use client";

import BottomSheet from "@/components/BottomSheet/BottomSheet";
import ListView from "../../../ListView/ListView";
import { ShowLikedStarDto } from "@/application/usecases/list/dto/ShowLikedStarDto";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";

interface BottomProps {
  likedStars: ShowLikedStarDto[];
  selectedStarId: string | number;
  setSelectedStarId: (id: string | number) => void;
  filteredEvents: ShowEventListDto[];
}

export default function Bottom({
  likedStars,
  selectedStarId,
  setSelectedStarId,
  filteredEvents,
}: BottomProps) {
  return (
    <div>
      {/* 바텀 시트가 열릴 때만 렌더링 */}
      <BottomSheet>
        <ListView
          selectedStarId={selectedStarId}
          setSelectedStarId={setSelectedStarId}
          filteredEvents={filteredEvents}
          likedStars={likedStars}
        />
      </BottomSheet>
    </div>
  );
}
