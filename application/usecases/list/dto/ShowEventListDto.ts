export interface ShowEventListDto {
  id: number;
  mainImage: string;
  title: string;
  startDate: Date;
  endDate: Date;
  starId: number;
  stageName: string;
  group?: string | null;
  address: string;
  latitude: number;
  longitude: number;
}
