export interface WaitingCardViewDto {
  mode: "WAITING";
  eventId: number;
  userId: string;
  mainImage: string;
  stageName: string;
  title: string;
  address: string;
  waitingNumber: number;
  waitingAhead: number;
}
