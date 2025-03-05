"use client";

import BottomSheet from "@/components/BottomSheet/BottomSheet";
import ListView from "../../../ListView/ListView";
import { ShowLikedStarDto } from "@/application/usecases/list/dto/ShowLikedStarDto";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";

interface MapBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

interface BottomProps {
  mapBounds: MapBounds | null;
  likedStars: ShowLikedStarDto[];
  eventList: ShowEventListDto[];
}

export default function Bottom({
  mapBounds,
  likedStars,
  eventList,
}: BottomProps) {
  return (
    <div>
      {/* 바텀 시트가 열릴 때만 렌더링 */}
      <BottomSheet>
        <ListView
          mapBounds={mapBounds}
          likedStars={likedStars}
          eventList={eventList}
        />
      </BottomSheet>
    </div>
  );
}
