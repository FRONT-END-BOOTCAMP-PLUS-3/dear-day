import { ShowEventDetailDto } from "@/application/usecases/event/dto/ShowEventDetailDto";

export const demoEventData: ShowEventDetailDto = {
  id: 123,
  starName: "슬기 (레드벨벳)",
  startDate: new Date("2025-03-01"),
  endDate: new Date("2025-03-04"),
  startTime: "10:00:00",
  endTime: "12:00:00",
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
  openAt: new Date("2025-02-28T17:30:00"),
  breaktime: 10, //  브레이크 타임
  limit: 3, // 타임당 30명 예약 가능
  hasReservation: true,
};
