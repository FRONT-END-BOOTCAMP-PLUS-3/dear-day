export enum Mode {
  RESERVATION = "RESERVATION",
  WAITING = "WAITING",
}

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
  mode: Mode;
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
  detailImage: ["/demo/detail-poster.jpeg"],
  benefits: ["무료 음료", "기념품 제공", "사진 촬영 가능"],
  address: "서울시 강남구 스타벅스",
  latitude: 37.4979,
  longitude: 127.0276,
  mode: Mode.WAITING, // ✅ 문자열 Enum과 일치
};
