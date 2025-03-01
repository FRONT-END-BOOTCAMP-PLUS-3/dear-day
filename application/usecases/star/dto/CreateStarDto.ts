export interface CreateStarDto {
  image: string;
  realName?: string | null;
  stageName: string;
  group?: string | null;
  birthday: Date;
}
