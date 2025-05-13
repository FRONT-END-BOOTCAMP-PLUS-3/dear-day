export interface GetEventByEventIdDto {
  eventDetail: {
    placeName: string;
    address: string;
    latitude: number;
    longitude: number;
    startDate: Date;
    endDate: Date;
    title: string;
    twitterId?: string;

    mode: string;
    startTime: string;
    endTime: string;
    openAt: Date;
    breaktime: number;
    limit: number;

    mainImage: string;
    detailImage: string[];
    benefits: string[];
  };
}
