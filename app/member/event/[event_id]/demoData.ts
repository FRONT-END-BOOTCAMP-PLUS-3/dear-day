import { ShowEventDetailDto } from "@/application/usecases/event/dto/ShowEventDetailDto";

export const demoEventData: ShowEventDetailDto = {
  id: 0,
  starName: "@@@@@",
  startDate: new Date("1000-10-10"),
  endDate: new Date("1000-10-10"),
  startTime: "00:00:00",
  endTime: "00:00:00",
  title: "해당 생일카페를 찾을 수 없습니다.",
  twitterId: "@@@@@",
  mainImage: "/event-detail-error/main.png",
  detailImage: [],
  benefits: [],
  address: "@@@@@",
  latitude: 37.4979,
  longitude: 127.0276,
  mode: "RESERVATION",
  openAt: new Date("1000-08-08T17:30:00"),
  breaktime: 10, //  브레이크 타임
  limit: 3, // 타임당 30명 예약 가능
  hasReservation: true,
};
