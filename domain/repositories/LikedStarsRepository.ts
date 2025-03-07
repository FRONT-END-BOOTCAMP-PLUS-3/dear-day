import { LikedStar } from "@prisma/client";

export interface LikedStarsRepository {
  createLikedStar(likedStar: LikedStar): Promise<void>;
}
