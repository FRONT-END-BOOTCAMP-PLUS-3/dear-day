"use client";

import ScrollCardContainer from "@/components/CardContainer/ScrollCardContainer";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";
import ListView from "@/components/EventView/ListView/ListView";
import { usePathname } from "next/navigation";

interface ListItemsProps {
  events: ShowEventListDto[];
  starNames: Record<number, string>; // ⭐ 스타 ID → 스타 이름 매핑
}

export default function ListItems({ events, starNames }: ListItemsProps) {
  const currentPath = usePathname();

  // ListView컴포넌트에서 이벤트 상세로 가려면 현재 경로명이 필요한데, SSR컴포넌트라 ListView컴포넌트에선 sePathname을 쓸 수가 없음.
  // 그래서 props로 전달해줘야 함
  return (
    <ScrollCardContainer variant="list">
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <ListView
              key={event.id}
              {...event}
              starName={starNames[event.starId] || "알 수 없음"}
              currentPath={currentPath}
            />
          ))
        ) : (
          <p>선택한 항목에 대한 결과가 없습니다.</p>
        )}
      </ul>
    </ScrollCardContainer>
  );
}
