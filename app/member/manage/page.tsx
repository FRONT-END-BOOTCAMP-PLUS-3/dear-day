"use client";

import SwipeCardContainer from "@/components/CardContainer/SwipeCardContainer";
import styles from "./page.module.scss";
import ScrollCardContainer from "@/components/CardContainer/ScrollCardContainer";
import SmallCardView from "@/components/EventView/SmallCardView/SmallCardView";
import { useEffect, useMemo, useState } from "react";
import { showMyEventListDto } from "@/application/usecases/event/dto/ShowMyEventListDto";

const ManagePage = () => {
  const [events, setEvents] = useState<showMyEventListDto[]>([]);

  useEffect(() => {
    const fetchMyEvent = async () => {
      try {
        const response = await fetch("/api/manage/show-my-event", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("이벤트를 불러오는 데 실패했습니다.");
        }

        const data = await response.json();
        setEvents(data.results);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("🚨 이벤트 조회 실패:", error);
        }
      }
    };
    fetchMyEvent();
  }, []);

  const onGoingEvents = useMemo(
    () =>
      events.filter(
        (event) => event.status === "진행중" || event.status === "예정"
      ),
    [events]
  );

  const endEvents = useMemo(
    () => events.filter((event) => event.status === "종료"),
    [events]
  );

  return (
    <div className={styles.homeContainer}>
      <div className={styles.tabContent}>
        <p className={styles.title}>진행 중인 생카</p>
        {onGoingEvents.length === 0 ? (
          <p className={styles.noEvent}>진행 중인 생카가 없습니다.</p>
        ) : (
          <SwipeCardContainer>
            {onGoingEvents.map((event) => (
              <SmallCardView
                key={event.id}
                id={event.id}
                imgSrc={event.mainImage}
                title={event.title}
                starName={event.starName}
                address={event.address}
                noLikeBtn={true}
                overlay={event.status === "예정"}
                openDate={event.startDate}
                endDate={event.endDate}
              />
            ))}
          </SwipeCardContainer>
        )}
        <p className={styles.title}>종료된 생카</p>
        {endEvents.length === 0 ? (
          <p className={styles.noEvent}>종료된 생카가 없습니다.</p>
        ) : (
          <ScrollCardContainer variant={"grid"}>
            {endEvents.map((event) => (
              <SmallCardView
                key={event.id}
                id={event.id}
                imgSrc={event.mainImage}
                title={event.title}
                starName={event.starName}
                address={event.address}
                noLikeBtn={true}
              />
            ))}
          </ScrollCardContainer>
        )}
      </div>
    </div>
  );
};

export default ManagePage;
