// dto/CreateEventRequestDto.ts
export interface CreateEventRequestDto {
  userId: string;
  starId: number;
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  title: string;
  twitterId?: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  mode: string;
  mainImage: string;
  detailImage: string[];
  benefits: string[];
}
