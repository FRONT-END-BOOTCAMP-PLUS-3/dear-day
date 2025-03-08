export interface ShowCourseEventsDto {
  id: number;

  eventId: number;
  imgSrc: string;
  title: string;
  startDate: Date;
  endDate: Date;

  latitude: number;
  longitude: number;
  order: number;
  starName: string;
}
