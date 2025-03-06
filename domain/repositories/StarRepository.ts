import { Star } from "@prisma/client";

export interface StarRepository {
  createStar(star: Star): Promise<void>;
  findStarByStarId(starId: number): Promise<Star | null>; // 스타 아이디로 스타 정보 받아오기
  findAllStarsByKeyword(keyword: string): Promise<Star[]>;
}
