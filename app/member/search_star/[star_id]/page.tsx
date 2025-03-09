"use client";

import ListView from "@/components/EventView/ListView/ListView";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { searchEventListByStarDto } from "@/application/usecases/event/dto/SearchEventListByStarDto";
import { useParams } from "next/navigation";

const MemberSearchResultPage = () => {
  const [eventList, setEventList] = useState<searchEventListByStarDto[]>([]);
  const params = useParams();
  const starId = params.star_id;

  useEffect(() => {
    if (!starId) {
      console.log("id를 찾을 수 없음");
      return;
    }

    const fetchSearchEvent = async () => {
      try {
        const response: Response = await fetch(
          `/api/event/show-search-event?star_id=${starId}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          console.error("목록을 불러오는 데 실패했습니다.");
          return [];
        }

        const { data } = await response.json();
        console.log(data);
        setEventList(data);
      } catch (error) {
        console.log("목록 조회 실패: ", error);
        setEventList([]);
      }
    };
    fetchSearchEvent();
  }, [starId]);

  return (
    <div className={styles.homeContainer}>
      {eventList ? (
        <ul>
          {eventList.map((event) => (
            <ListView
              key={event.id}
              id={event.id}
              mainImage={event.imgSrc}
              title={event.title}
              startDate={event.startDate}
              endDate={event.endDate}
              stageName={event.starName}
              address={event.address}
              currentPath={`/member/search_star/${starId}`}
            />
          ))}
        </ul>
      ) : (
        <div className={styles.noResult}>
          <p>검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MemberSearchResultPage;
