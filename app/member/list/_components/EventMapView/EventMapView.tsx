"use client";

import { useState } from "react";
import Bottom from "./_components/Bottom/Bottom";
import Map from "./_components/Map/Map";
import { ShowLikedStarDto } from "@/application/usecases/list/dto/ShowLikedStarDto";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";

interface MapBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

interface EventMapViewProps {
  eventList: ShowEventListDto[];
  likedStars: ShowLikedStarDto[];
}

export default function EventMapView({
  eventList,
  likedStars,
}: EventMapViewProps) {
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);

  return (
    <div>
      {/* 지도에서 범위를 받아와 상태로 저장 */}
      <Map eventList={eventList} setMapBounds={setMapBounds} />
      {/* ListView에 mapBounds, likedStars, eventList 전달 */}
      <Bottom
        mapBounds={mapBounds}
        likedStars={likedStars}
        eventList={eventList}
      />
    </div>
  );
}
