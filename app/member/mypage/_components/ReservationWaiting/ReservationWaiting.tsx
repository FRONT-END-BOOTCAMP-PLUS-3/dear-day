import SwipeCardContainer from "@/components/CardContainer/SwipeCardContainer";
import ScrollCardContainer from "@/components/CardContainer/ScrollCardContainer";
import SmallCardView from "@/components/EventView/SmallCardView/SmallCardView";
import styles from "@/app/member/mypage/page.module.scss";

const ReservationWaiting = () => {
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
  ];

  return (
    <div className={styles.tabContent}>
      <p className={styles.title}>진행중인 예약</p>
      <SwipeCardContainer>
        {cardData.map((card) => (
          <SmallCardView
            key={card.id}
            id={card.id}
            imgSrc={card.imgSrc}
            title={card.title}
            starName={card.starName}
            address={card.address}
          />
        ))}
      </SwipeCardContainer>
      <p className={styles.title}>진행중인 대기</p>
      <SwipeCardContainer>
        {cardData.map((card) => (
          <SmallCardView
            key={card.id}
            id={card.id}
            imgSrc={card.imgSrc}
            title={card.title}
            starName={card.starName}
            address={card.address}
          />
        ))}
      </SwipeCardContainer>
      <p className={styles.title}>다녀온 생카</p>
      <ScrollCardContainer variant="grid">
        {cardData.map((card) => (
          <SmallCardView
            key={card.id}
            id={card.id}
            imgSrc={card.imgSrc}
            title={card.title}
            starName={card.starName}
            address={card.address}
          />
        ))}
      </ScrollCardContainer>
    </div>
  );
};

export default ReservationWaiting;
