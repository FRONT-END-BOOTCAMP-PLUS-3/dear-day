"use client";

import ListView from "../ListView/ListView";
import { ShowLikedStarDto } from "@/application/usecases/list/dto/ShowLikedStarDto";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";

interface EventListViewProps {
  eventList: ShowEventListDto[];
  likedStars: ShowLikedStarDto[];
}

export default function EventListView({
  eventList,
  likedStars,
}: EventListViewProps) {
  return (
    <div>
      <ListView eventList={eventList} likedStars={likedStars} />
    </div>
  );
}
