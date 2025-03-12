export interface UpdateReservationStatusDto {
  success: boolean;
  updatedReservation?: {
    id: number;
    status: string;
  };
}
