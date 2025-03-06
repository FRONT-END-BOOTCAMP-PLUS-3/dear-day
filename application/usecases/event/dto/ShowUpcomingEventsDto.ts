export interface ShowUpcomingEventsDto {
  ShowUpcomingEvents: UpcomingEventDto[];
}

export interface UpcomingEventDto {
  id: number;
  imgSrc: string;
  title: string;
  startDate: Date;
  endDate: Date;
  starName: string;
  address: string;
}
