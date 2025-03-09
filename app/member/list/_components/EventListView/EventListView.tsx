"use client";

import ListView from "../ListView/ListView";
import { ShowLikedStarDto } from "@/application/usecases/list/dto/ShowLikedStarDto";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";
import { useState } from "react";

interface EventListViewProps {
  eventList: ShowEventListDto[];
  likedStars: ShowLikedStarDto[];
}

export default function EventListView({
  eventList,
  likedStars,
}: EventListViewProps) {
  const [selectedStarId, setSelectedStarId] = useState<string | number>("전체");
  const likedStarIds = likedStars.map((star) => star.starId);

  const filteredEvents =
    selectedStarId === "전체"
      ? eventList // 전체 보기
      : selectedStarId === "찜한 스타 전체"
        ? eventList.filter((event) => likedStarIds.includes(event.starId)) // 🔥 찜한 스타들의 이벤트 필터링
        : eventList.filter((event) => event.starId === selectedStarId);

  return (
    <div>
      <ListView
        selectedStarId={selectedStarId}
        setSelectedStarId={setSelectedStarId}
        filteredEvents={filteredEvents}
        likedStars={likedStars}
      />
    </div>
  );
}
