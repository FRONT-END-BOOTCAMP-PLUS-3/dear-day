export interface StarDto {
  image: string;
  realName?: string | null;
  stageName: string;
  group?: string | null;
  birthday: string;
  createdAt: Date;
  events: string[];
  likeByUsers: string[];
}
