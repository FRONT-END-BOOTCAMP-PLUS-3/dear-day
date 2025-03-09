"use client";

import ScrollCardContainer from "@/components/CardContainer/ScrollCardContainer";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";
import ListView from "@/components/EventView/ListView/ListView";
import { usePathname } from "next/navigation";

interface ListItemsProps {
  events: ShowEventListDto[];
}

export default function ListItems({ events }: ListItemsProps) {
  const currentPath = usePathname();

  return (
    <ScrollCardContainer variant="list">
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <ListView key={event.id} {...event} currentPath={currentPath} />
          ))
        ) : (
          <p>선택한 항목에 대한 결과가 없습니다.</p>
        )}
      </ul>
    </ScrollCardContainer>
  );
}
