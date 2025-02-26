export interface EventData {
  id: number;
  starName: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  title: string;
  twitterId: string;
  mainImage: string;
  detailImage: string[];
  benefits: string[];
  address: string;
  latitude: number;
  longitude: number;
  mode: "RESERVATION" | "WAITING";
}

// ✅ `Date` 타입을 적용한 `demoEventData`
export const demoEventData: EventData = {
  id: 123,
  starName: "슬기 (레드벨벳)",
  startDate: new Date("2025-03-01"),
  endDate: new Date("2025-03-10"),
  startTime: "10:00:00",
  endTime: "20:00:00",
  title: "Dear Seulgi",
  twitterId: "@seulgi",
  mainImage: "/demo/main-poster.jpeg",
  detailImage: ["/demo/detail-poster.jpeg", "/demo/detail-poster.jpeg"],
  benefits: [
    "🧃 컵홀더",
    "🎟️ 티켓",
    "🪞 거울",
    "🧸 키링",
    "포토부스",
    "해시태그 이벤트",
  ],
  address: "서울시 강남구 스타벅스",
  latitude: 37.4979,
  longitude: 127.0276,
  mode: "RESERVATION",
};
