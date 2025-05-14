import { LikedStar } from "@prisma/client";

export interface LikedStarsRepository {
  findLikedStarsByUserId(userId: string): Promise<LikedStar[]>;
  createLikedStar(likedStar: LikedStar): Promise<void>;
  findLikedStarByStarId(
    starId: number,
    userId: string
  ): Promise<LikedStar | false>;
  createStartoLiked(starId: number, userId: string): Promise<LikedStar>;
  deleteLikedStarByStarId(starId: number, userId: string): Promise<void>;
}
