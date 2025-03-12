import { UserLikedStarDto } from "@/application/usecases/mypage/dto/UserLikedStarDto";
import { Star } from "@prisma/client";

export interface StarRepository {
  createStar(star: Star): Promise<void>;
  findStarByStarId(starId: number): Promise<Star | null>; // 스타 아이디로 스타 정보 받아오기
  findAllStarsByKeyword(keyword: string): Promise<Star[]>;
  findLikedStarsByUserId(userId: string): Promise<UserLikedStarDto[]>; // 유저 아이디로 스타 정보 가져오기
  findStarProfile(starId: number): Promise<StarProfileDto>;
  findAll(): Promise<Star[]>;
}
