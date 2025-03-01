export interface CreateStarDto {
  image: Blob;
  realName?: string | null;
  stageName: string;
  group?: string | null;
  birthday: Date;
}
