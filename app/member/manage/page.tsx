"use client";

import SwipeCardContainer from "@/components/CardContainer/SwipeCardContainer";
import styles from "./page.module.scss";
import ScrollCardContainer from "@/components/CardContainer/ScrollCardContainer";
import SmallCardView from "@/components/EventView/SmallCardView/SmallCardView";

const ManagePage = () => {
  const cardData = [
    {
      id: 1,
      imgSrc: "/demo/main-poster.jpeg",
      title: "스타 1",
      starName: "카리나",
      address: "서울 강남구",
    },
    {
      id: 2,
      imgSrc: "/demo/main-poster.jpeg",
      title: "스타 2",
      starName: "윈터",
      address: "서울 강동구",
    },
    {
      id: 3,
      imgSrc: "/demo/main-poster.jpeg",
      title: "스타 3",
      starName: "지젤",
      address: "서울 서초구",
    },
    {
      id: 4,
      imgSrc: "/demo/main-poster.jpeg",
      title: "스타 4",
      starName: "닝닝",
      address: "서울 송파구",
    },
    {
      id: 5,
      imgSrc: "/demo/main-poster.jpeg",
      title: "스타 5",
      starName: "아이유",
      address: "서울 마포구",
    },
    {
      id: 6,
      imgSrc: "/demo/main-poster.jpeg",
      title: "스타 6",
      starName: "태연",
      address: "서울 종로구",
    },
    {
      id: 7,
      imgSrc: "/demo/main-poster.jpeg",
      title: "스타 7",
      starName: "제니",
      address: "서울 강서구",
    },
    {
      id: 8,
      imgSrc: "/demo/main-poster.jpeg",
      title: "스타 8",
      starName: "지수",
      address: "서울 중구",
    },
    {
      id: 9,
      imgSrc: "/demo/main-poster.jpeg",
      title: "스타 9",
      starName: "로제",
      address: "서울 용산구",
    },
    {
      id: 10,
      imgSrc: "/demo/main-poster.jpeg",
      title: "스타 10",
      starName: "리사",
      address: "서울 동작구",
    },
    {
      id: 11,
      imgSrc: "/demo/main-poster.jpeg",
      title: "스타 11",
      starName: "수지",
      address: "서울 관악구",
    },
    {
      id: 12,
      imgSrc: "/demo/main-poster.jpeg",
      title: "스타 12",
      starName: "선미",
      address: "서울 성동구",
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <div className={styles.tabContent}>
        <p className={styles.title}>진행중인 생카</p>
        <SwipeCardContainer>
          {cardData.map((card) => (
            <SmallCardView
              key={card.id}
              id={card.id}
              imgSrc={card.imgSrc}
              title={card.title}
              starName={card.starName}
              address={card.address}
              noLikeBtn={true}
            />
          ))}
        </SwipeCardContainer>
        <p className={styles.title}>종료된 생카</p>
        <ScrollCardContainer variant={"grid"}>
          {cardData.map((card) => (
            <SmallCardView
              key={card.id}
              id={card.id}
              imgSrc={card.imgSrc}
              title={card.title}
              starName={card.starName}
              address={card.address}
              noLikeBtn={true}
            />
          ))}
        </ScrollCardContainer>
      </div>
    </div>
  );
};

export default ManagePage;
