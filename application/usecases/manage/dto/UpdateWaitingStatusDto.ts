export interface UpdateWaitingStatusDto {
  success: boolean;
  updatedWaiting?: {
    id: number;
    status: string;
  };
}
