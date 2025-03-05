"use client";

import ScrollCardContainer from "@/components/CardContainer/ScrollCardContainer";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";

interface ListItemsProps {
  events: ShowEventListDto[];
  starNames: Record<number, string>; // ⭐ 스타 ID → 스타 이름 매핑
}

export default function ListItems({ events, starNames }: ListItemsProps) {
  return (
    <ScrollCardContainer variant="list">
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event.id}>
              <img
                src={event.mainImage}
                alt={event.title}
                width={50}
                height={50}
              />
              <div>
                <h3>{event.title}</h3>
                <p>
                  {event.startDate.toDateString()} ~{" "}
                  {event.endDate.toDateString()}
                </p>
                <p>{event.address}</p>
                <p>{starNames[event.starId] || "알 수 없음"}</p>{" "}
                {/* 스타 이름 표시 */}
              </div>
            </li>
          ))
        ) : (
          <p>선택한 항목에 대한 결과가 없습니다.</p>
        )}
      </ul>
    </ScrollCardContainer>
  );
}
