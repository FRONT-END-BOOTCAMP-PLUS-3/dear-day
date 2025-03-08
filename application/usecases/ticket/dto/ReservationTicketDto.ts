export interface ReservationTicketDto {
  mode: "RESERVATION";
  eventId: number;
  userId: string;
  title: string;
  mainImage: string;
  address: string;
  email: string;
  reservationConfirmedAt: string;
  breaktime: number;
}
