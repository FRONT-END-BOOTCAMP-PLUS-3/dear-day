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

    const fetchStarProfile = async () => {
      try {
        const response = await fetch(
          `/api/star/star-profile?starId=${starId}`,
          { method: "GET" }
        );

        if (!response.ok) throw new Error("Failed to fetch user info");

        const { data } = await response.json();
        console.log("API 응답 데이터:", data);

        if (!data) {
          throw new Error("Invalid response structure");
        }

        const starData: StarProfileDto = {
          id: data.id,
          image:
            data.image && data.image.trim() !== ""
              ? data.image
              : "/default-profile.png",
          stageName: data.stageName,
          group: data.group ?? null,
          birthday: data.birthday ?? undefined,
        };

        setStarProfile(starData);
      } catch (error) {
        console.log("프로필 조회 실패: ", error);
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
              src={starProfile.image}
              alt={starProfile.stageName}
              fill
            />
          </div>
          <div className={styles.profile}>
            <div className={styles.info}>
              <h2>{starProfile.stageName}</h2>
              <p>{starProfile.group}</p>
              <p>{starProfile.birthday}</p>
            </div>
            <div className={styles.heartBox}>
              <div className={styles.heartBtn}>
                <StarButton starId={starProfile.id} />
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
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
    </div>
  );
};

export default MemberSearchResultPage;
