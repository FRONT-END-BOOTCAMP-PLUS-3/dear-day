import { LikedStar } from "@prisma/client";

export interface LikedStarsRepository {
  findLikedStarsByUserId(userId: string): Promise<LikedStar[]>;
}
