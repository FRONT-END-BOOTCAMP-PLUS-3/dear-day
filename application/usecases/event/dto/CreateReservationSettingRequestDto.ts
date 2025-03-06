// dto/CreateReservationSettingRequestDto.ts
export interface CreateReservationSettingRequestDto {
  eventId: number; // FK로 들어가는 값
  openAt: Date;
  breaktime: number;
  limit: number;
}
