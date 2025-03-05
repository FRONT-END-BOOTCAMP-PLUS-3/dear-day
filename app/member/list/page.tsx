"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Tab from "./_components/Tab/Tab";
import EventListView from "./_components/EventListView/EventListView";
import EventMapView from "./_components/EventMapView/EventMapView";
import { ShowLikedStarDto } from "@/application/usecases/list/dto/ShowLikedStarDto";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";

export default function ListPage() {
  const [activeTab, setActiveTab] = useState("리스트로 보기");
  const [likedStars, setLikedStars] = useState<ShowLikedStarDto[]>([]);
  const [eventList, setEventList] = useState<ShowEventListDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // API 요청 (찜한 스타 목록 & 이벤트 목록)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [likedStarsRes, eventListRes] = await Promise.all([
          fetch("/api/liked-stars"),
          fetch("/api/events"),
        ]);

        const likedStarsData = await likedStarsRes.json();
        const eventListData = await eventListRes.json();

        setLikedStars(likedStarsData);
        setEventList(eventListData);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className={styles.listContainer}>
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "리스트로 보기" ? (
        <EventListView likedStars={likedStars} eventList={eventList} />
      ) : (
        <EventMapView likedStars={likedStars} eventList={eventList} />
      )}
    </div>
  );
}
