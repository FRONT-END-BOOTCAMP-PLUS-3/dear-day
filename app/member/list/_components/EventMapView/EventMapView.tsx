"use client";

import { useState, useMemo } from "react";
import Bottom from "./_components/Bottom/Bottom";
import Map from "./_components/Map/Map";
import { ShowLikedStarDto } from "@/application/usecases/list/dto/ShowLikedStarDto";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";
import { useMapStore } from "@/store/useMapStore";

interface EventMapViewProps {
  eventList: ShowEventListDto[];
  likedStars: ShowLikedStarDto[];
}

export default function EventMapView({
  eventList,
  likedStars,
}: EventMapViewProps) {
  const [selectedStarId, setSelectedStarId] = useState<string | number>("전체");
  const likedStarIds = likedStars.map((star) => star.starId);
  const { bounds } = useMapStore();

  // `filteredEvents`는 `selectedStarId`가 변경될 때만 계산
  const filteredEvents = useMemo(() => {
    if (selectedStarId === "전체") {
      return eventList;
    }
    if (selectedStarId === "찜한 스타 전체") {
      return eventList.filter((event) => likedStarIds.includes(event.starId));
    }
    return eventList.filter((event) => event.starId === selectedStarId);
  }, [selectedStarId, eventList, likedStarIds]);

  // `filteredEventsByBounds`는 `filteredEvents`나 `mapBounds`가 변경될 때만 계산
  const filteredEventsByBounds = useMemo(() => {
    if (!bounds) return filteredEvents;
    return filteredEvents.filter(
      (event) =>
        event.latitude >= bounds.minLat &&
        event.latitude <= bounds.maxLat &&
        event.longitude >= bounds.minLng &&
        event.longitude <= bounds.maxLng
    );
  }, [filteredEvents, bounds]);

  return (
    <div>
      {/* 지도에서 범위를 받아와 상태로 저장 */}
      <Map filteredEvents={filteredEvents} />
      {/* ListView에 likedStars, eventList 전달 */}
      <Bottom
        likedStars={likedStars}
        selectedStarId={selectedStarId}
        setSelectedStarId={setSelectedStarId}
        filteredEvents={filteredEventsByBounds}
      />{" "}
    </div>
  );
}
