export interface showWaitingListDto {
  title: string;
  mainImg: string;
  address: string;
  startDate: Date;
  endDate: Date;
  mode: string;
  waitingList: {
    id: number;
    userId: string;
    name: string;
    email: string;
    waitingNumber: number;
    headCount: number;
    confirmedAt: Date;
    status: string;
  }[];
}
