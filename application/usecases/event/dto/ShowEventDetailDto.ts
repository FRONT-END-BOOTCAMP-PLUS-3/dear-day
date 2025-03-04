export interface ShowEventDetailDto {
  id: number;
  starName: string;

  startDate: Date;
  endDate: Date;

  startTime: string;
  endTime: string;

  title: string;
  twitterId?: string;

  mainImage: string;
  detailImage: string[];

  benefits: string[];
  address: string;
  latitude: number;
  longitude: number;

  mode: string; // "RESERVATION" | "WAITING"

  // RESERVATION 일 때 필요한거
  openAt?: Date; // 예약 오픈 시간
  breaktime?: number; // 쉬는시간 몇분인지
  limit?: number; // 한 타임당 제한인원
  hasReservation?: boolean; // 이미 예약 되어있는지 여부

  // WAITING 일 때 필요한거
  hasWaiting?: boolean; // 이미 대기 되어있는지 여부
}
