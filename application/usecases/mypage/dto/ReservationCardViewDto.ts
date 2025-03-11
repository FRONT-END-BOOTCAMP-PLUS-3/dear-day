export interface ReservationCardViewDto {
  mode: "RESERVATION";
  eventId: number;
  userId: string;
  mainImage: string;
  title: string;
  stageName: string;
  address: string;
  reservationConfirmedAt: string;
}
