"use client";

import ScrollCardContainer from "@/components/CardContainer/ScrollCardContainer";
import SmallCardView from "@/components/EventView/SmallCardView/SmallCardView";
import StarView from "@/components/StarView/StarView";
import styles from "@/app/member/mypage/page.module.scss";
import useToggle from "@/hooks/useToggle";
import StarUpload from "../Star/StarUpload";
import SearchModal from "../SearchModal/SearchModal";
import { useEffect, useState } from "react";
import { UserLikedStarDto } from "@/application/usecases/mypage/dto/UserLikedStarDto";
import { UserLikedEventDto } from "@/application/usecases/mypage/dto/UserLikedEventDto";
import EmptyText from "../EmptyText/EmptyText";
import { useRouter } from "next/navigation";

const Wishlist = () => {
  const router = useRouter();

  const [isModalOpen, toggleModal] = useToggle(false);
  const [starData, setStarData] = useState<UserLikedStarDto[]>([]);
  const [likedEvents, setLikedEvents] = useState<UserLikedEventDto[]>([]);

  const fetchLikedStars = async () => {
    try {
      const response = await fetch("/api/mypage/liked-star", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to fetch liked stars");

      const data = await response.json();
      setStarData(data);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 :", error);
      }
    }
  };

  const fetchLikedEvents = async () => {
    try {
      const response = await fetch("/api/like/list");
      const data = await response.json();
      setLikedEvents(data);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 좋아요 목록 불러오는 중 오류 발생:", error);
      }
    }
  };

  useEffect(() => {
    fetchLikedStars();
    fetchLikedEvents();
  }, []);

  const handleStarViewClick = (starId?: number) => {
    if (!starId) return;
    router.push(`/member/search_star/${starId}`);
  };

  return (
    <div className={styles.tabContent}>
      <p className={styles.title}>찜한 스타</p>
      <ScrollCardContainer variant="gridStar">
        <StarUpload onClick={toggleModal} />
        {starData.map((card) => (
          <div
            key={card.starId}
            onClick={() => handleStarViewClick(card.starId)}
          >
            <StarView starImage={card.image} starName={card.name} />
          </div>
        ))}
      </ScrollCardContainer>
      <p className={styles.title}>찜한 생카</p>
      {likedEvents.length > 0 ? (
        <ScrollCardContainer variant="grid">
          {likedEvents.map((card) => (
            <SmallCardView
              key={card.id}
              id={card.id}
              imgSrc={card.mainImage}
              title={card.title}
              starName={card.starName}
              address={card.address}
            />
          ))}
        </ScrollCardContainer>
      ) : (
        <EmptyText container="LikedEvent" />
      )}

      <SearchModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        refreshStars={fetchLikedStars}
      />
    </div>
  );
};

export default Wishlist;
