"use client";
import SwipeCardContainer from "@/components/CardContainer/SwipeCardContainer";
import Profile from "./_components/Profile/Profile";
import Tab from "./_components/Tab/Tab";
import styles from "./page.module.scss";
import ScrollCardContainer from "@/components/CardContainer/ScrollCardContainer";
import SmallCardView from "@/components/EventView/SmallCardView/SmallCardView";
import StarView from "@/components/StarView/StarView";
import SearchStar from "@/components/SearchStar/SearchStar";
import useToggle from "@/hooks/useToggle";
import StarUpload from "./_components/Star/StarUpload";

const Page = () => {
  const starData = [
    { id: 1, name: "민지", image: "/demo/main-poster.jpeg" },
    { id: 2, name: "민지", image: "/demo/main-poster.jpeg" },
    { id: 3, name: "민지", image: "/demo/main-poster.jpeg" },
    { id: 4, name: "민지", image: "/demo/main-poster.jpeg" },
    { id: 5, name: "민지", image: "/demo/main-poster.jpeg" },
    { id: 6, name: "민지", image: "/demo/main-poster.jpeg" },
    { id: 7, name: "민지", image: "/demo/main-poster.jpeg" },
    { id: 8, name: "민지", image: "/demo/main-poster.jpeg" },
    { id: 9, name: "민지", image: "/demo/main-poster.jpeg" },
    { id: 10, name: "민지", image: "/demo/main-poster.jpeg" },
    { id: 11, name: "민지", image: "/demo/main-poster.jpeg" },
    { id: 12, name: "민지", image: "/demo/main-poster.jpeg" },
  ];
  const [isModalOpen, toggleModal] = useToggle(false);

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

  const Wishlist = () => (
    <div className={styles.tabContent}>
      <p className={styles.title}>찜한 스타</p>
      <ScrollCardContainer variant={"gridStar"}>
        {/* ⭐ StarUploadButton 클릭 시 모달 열기 */}
        <StarUpload onClick={toggleModal} />
        {starData.map((card) => (
          <StarView key={card.id} starImage={card.image} starName={card.name} />
        ))}
      </ScrollCardContainer>
      <p className={styles.title}>찜한 생카</p>
      <ScrollCardContainer variant={"grid"}>
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
  const Reservation = () => (
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
      <ScrollCardContainer variant={"grid"}>
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
  return (
    <div className={styles.pageContainer}>
      <Profile />
      <div className={styles.tabContainer}>
        <Tab
          tabs={[
            { label: "찜", content: <Wishlist /> },
            { label: "예약/대기", content: <Reservation /> },
          ]}
        />
      </div>
      {/* ⭐ 모달 추가 */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={toggleModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={toggleModal}>
              X
            </button>
            <SearchStar
              onSelectStar={function (star: Star): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
