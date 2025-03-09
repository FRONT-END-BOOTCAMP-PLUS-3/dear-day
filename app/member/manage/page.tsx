"use client";

import SwipeCardContainer from "@/components/CardContainer/SwipeCardContainer";
import styles from "./page.module.scss";
import ScrollCardContainer from "@/components/CardContainer/ScrollCardContainer";
import SmallCardView from "@/components/EventView/SmallCardView/SmallCardView";
import { useEffect, useMemo, useState } from "react";
import { showMyEventListDto } from "@/application/usecases/event/dto/ShowMyEventListDto";

const ManagePage = () => {
  const [events, setEvents] = useState<showMyEventListDto[]>([]);
  // const [upComingEvents, setUpComingEvents] = useState<showMyEventListDto[]>(
  //   []
  // );
  // const [onGoingEvents, setOnGoingEvents] = useState<showMyEventListDto[]>([]);
  // const [endEvents, setEndEvents] = useState<showMyEventListDto[]>([]);

  useEffect(() => {
    const fetchMyEvent = async () => {
      try {
        const response = await fetch("/api/event/show-my-event", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("이벤트를 불러오는 데 실패했습니다.");
        }

        const data = await response.json();
        setEvents(data.results);
      } catch (error) {
        console.error("이벤트 조회 실패: ", error);
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

  console.log("onGoingEvents :", onGoingEvents);
  console.log("endEvents :", endEvents);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.tabContent}>
        <p className={styles.title}>진행중인 생카</p>
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
            />
          ))}
        </SwipeCardContainer>
        <p className={styles.title}>종료된 생카</p>
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
      </div>
    </div>
  );
};

export default ManagePage;
