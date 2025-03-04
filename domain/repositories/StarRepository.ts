import { Star } from "@prisma/client";

export interface StarRepository {
  createStar(star: Star): Promise<void>;
  searchStarByKeyword(keyword: string): Promise<
    {
      id: number;
      image: string;
      stageName: string | null;
      realName: string | null;
      group: string | null;
    }[]
  >;
}
