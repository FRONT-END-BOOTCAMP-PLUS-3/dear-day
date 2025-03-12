export interface showReservationListDto {
  title: string;
  mainImg: string;
  address: string;
  startDate: Date;
  endDate: Date;
  mode: string;
  startTime: string;
  endTime: string;
  reservationList: {
    id: number;
    userId: string;
    name: string;
    email: string;
    confirmedAt: Date;
    status: string;
  }[];
}
