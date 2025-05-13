export interface UpdateEventDataDto {
  placeName?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  title?: string;
  twitterId?: string;
  startTime?: string;
  endTime?: string;
  startDate?: Date;
  endDate?: Date;
  mode?: string;
  mainImage?: string;
  detailImage?: string[];
  benefits?: string[];

  openAt?: Date;
  breaktime?: number;
  limit?: number;
}
