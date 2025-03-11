"use client";

import ListView from "@/components/EventView/ListView/ListView";
import styles from "./page.module.scss";
import { usePathname } from "next/navigation"; // 현재 경로 가져오기

const SearchResultPage = () => {
  const pathname = usePathname(); // 현재 페이지 경로 가져오기

  const events = [
    {
      id: 1,
      imgSrc: "/poster.png",
      title: "디어데이 팬미팅",
      startDate: new Date("2024-04-15"),
      endDate: new Date("2024-04-16"),
      starName: "디어데이",
      address: "서울 강남구 스타카페",
    },
    {
      id: 2,
      imgSrc: "/poster.png",
      title: "마이더스 콘서트",
      startDate: new Date("2024-05-10"),
      endDate: new Date("2024-05-10"),
      starName: "마이더스",
      address: "부산 해운대 아트홀",
    },
    {
      id: 3,
      imgSrc: "/poster.png",
      title: "샤이닝 블루 팬사인회",
      startDate: new Date("2024-06-05"),
      endDate: new Date("2024-06-06"),
      starName: "샤이닝 블루",
      address: "대구 동성로 스타홀",
    },
    {
      id: 4,
      imgSrc: "/poster.png",
      title: "소울 비트 라이브 공연",
      startDate: new Date("2024-07-01"),
      endDate: new Date("2024-07-01"),
      starName: "소울 비트",
      address: "서울 마포구 홍대 라이브홀",
    },
    {
      id: 5,
      imgSrc: "/poster.png",
      title: "스타 빛나리 팬미팅",
      startDate: new Date("2024-08-12"),
      endDate: new Date("2024-08-12"),
      starName: "빛나리",
      address: "인천 송도 컨벤션센터",
    },
  ];

  // const events = null;

  return (
    <div className={styles.homeContainer}>
      {events ? (
        <ul>
          {events.map((event) => (
            <ListView
              key={event.id}
              id={event.id}
              mainImage={event.imgSrc}
              title={event.title}
              startDate={event.startDate}
              endDate={event.endDate}
              stageName={event.starName}
              address={event.address}
              currentPath={pathname}
            />
          ))}
        </ul>
      ) : (
        <div className={styles.noResult}>
          <p>검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;
