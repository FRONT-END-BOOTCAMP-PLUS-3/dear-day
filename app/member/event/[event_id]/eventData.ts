// types.ts
export enum Mode {
  RESERVATION = "RESERVATION",
  WAITING = "WAITING",
}

export interface EventData {
  id: number;
  starId: number;
  startDate: string; // Date 객체를 받으면 변환이 필요함
  endDate: string;
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

export const demoEventData: EventData = {
  id: 123,
  starId: 456,
  startDate: "2025-03-01",
  endDate: "2025-03-10",
  startTime: "10:00",
  endTime: "18:00",
  title: "이벤트 제목",
  twitterId: "@example",
  mainImage: "/demo/main-poster.jpeg",
  detailImage: ["/demo/detail-poster.jpeg"],
  benefits: ["무료 음료", "기념품 제공", "사진 촬영 가능"],
  address: "서울시 강남구 스타벅스",
  latitude: 37.4979,
  longitude: 127.0276,
  mode: Mode.RESERVATION,
};
