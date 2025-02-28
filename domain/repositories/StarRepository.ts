import { Star } from "@prisma/client";

export interface StarRepository {
  findStarById(id: string): Promise<Star | null>; // 스타 아이디로 스타 정보 받아오기
}
