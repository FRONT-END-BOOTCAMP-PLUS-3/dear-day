import ScrollCardContainer from "@/components/CardContainer/ScrollCardContainer";
import SmallCardView from "@/components/EventView/SmallCardView/SmallCardView";
import StarView from "@/components/StarView/StarView";
import styles from "@/app/member/mypage/page.module.scss";
import useToggle from "@/hooks/useToggle";
import StarUpload from "../Star/StarUpload";
import SearchStar from "@/components/SearchStar/SearchStar";
import Icon from "@/components/Icon/Icon";
import { useEffect, useState } from "react";
import { UserLikedStarDto } from "@/application/usecases/mypage/dto/UserLikedStarDto";

const Wishlist = () => {
  const [isModalOpen, toggleModal] = useToggle(false);
  const [starData, setStarData] = useState<UserLikedStarDto[]>([]);

  useEffect(() => {
    const fetchLikedStars = async () => {
      try {
        const response = await fetch("/api/mypage/liked-star", {
          method: "GET",
        });

        if (!response.ok) throw new Error("Failed to fetch liked stars");

        const data = await response.json();

        setStarData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLikedStars();
  }, []);

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
      <p className={styles.title}>찜한 스타</p>
      <ScrollCardContainer variant="gridStar">
        <StarUpload onClick={toggleModal} />
        {starData.map((card) => (
          <StarView
            key={card.starId}
            starImage={card.image}
            starName={card.name}
          />
        ))}
      </ScrollCardContainer>
      <p className={styles.title}>찜한 생카</p>
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

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={toggleModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={toggleModal}>
              <Icon id="close" />
            </button>
            <SearchStar
              onSelectStarId={function (star: Star): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
