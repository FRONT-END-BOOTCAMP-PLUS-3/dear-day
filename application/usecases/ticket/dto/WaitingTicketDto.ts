export interface WaitingTicketDto {
  mode: "WAITING";
  eventId: number;
  userId: string;
  waitingNumber: number;
  mainImage: string;
  title: string;
  address: string;
  email: string;
  headCount: number;
  waitingAhead: number;
}
