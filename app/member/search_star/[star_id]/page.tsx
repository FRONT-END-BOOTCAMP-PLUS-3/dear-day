"use client";

import ListView from "@/components/EventView/ListView/ListView";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { searchEventListByStarDto } from "@/application/usecases/event/dto/SearchEventListByStarDto";
import { useParams } from "next/navigation";
import { StarProfileDto } from "@/application/usecases/star/dto/StarProfileDto";
import Image from "next/image";
import StarButton from "@/components/Button/StarButton/StarButton";

const MemberSearchResultPage = () => {
  const [eventList, setEventList] = useState<searchEventListByStarDto[]>([]);
  const [starProfile, setStarProfile] = useState<StarProfileDto>();
  const params = useParams();
  const starId = params.star_id;

  useEffect(() => {
    if (!starId) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 ID를 찾을 수 없음");
      }
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
          if (process.env.NODE_ENV === "development") {
            console.error("🚨 목록을 불러오는데 실패했습니다");
          }
          return [];
        }

        const { data } = await response.json();

        setEventList(data.length > 0 ? data : []); // 데이터가 없을 경우 빈 배열로 설정
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("🚨 목록 조회 실패:", error);
        }
        setEventList([]);
      }
    };

    const fetchStarProfile = async () => {
      try {
        const response = await fetch(
          `/api/star/star-profile?starId=${starId}`,
          { method: "GET" }
        );

        if (!response.ok) throw new Error("Failed to fetch user info");

        const { data } = await response.json();

        if (!data) {
          throw new Error("Invalid response structure");
        }

        const starData: StarProfileDto = {
          id: data.id,
          image:
            data.image && data.image.trim() !== ""
              ? data.image
              : "/event-detail-error/main.png",
          stageName: data.stageName,
          group: data.group ?? null,
          birthday: data.birthday ?? undefined,
        };

        setStarProfile(starData);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("🚨 프로필 조회 실패:", error);
        }
      }
    };

    fetchStarProfile();
    fetchSearchEvent();
  }, [starId]);

  return (
    <div className={styles.homeContainer}>
      {starProfile && (
        <div className={styles.profileContainer}>
          <div className={styles.imageBox}>
            <Image
              className={styles.cardImg}
              src={process.env.NEXT_PUBLIC_FRONT_IMG + starProfile.image}
              alt={starProfile.stageName}
              fill
              unoptimized
            />
          </div>
          <div className={styles.profile}>
            <div className={styles.info}>
              <h2>{starProfile.stageName}</h2>
              <p>{starProfile.group}</p>
              <p>🎂 {starProfile.birthday}</p>
            </div>
            <div className={styles.starBox}>
              <div className={styles.starBtn}>
                <StarButton starId={starProfile.id} />
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {eventList.length > 0 ? ( // ✅ 데이터가 있을 때만 리스트 표시
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
            <p>등록된 생일카페가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberSearchResultPage;
