import { LikedStarsRepository } from "@/domain/repositories/LikedStarsRepository";
import { LikedStarDto } from "./dto/LikedStarDto";

export const createLikedStar = async (
  starId: number,
  userId: string,
  likedStarsRepository: LikedStarsRepository
): Promise<LikedStarDto> => {
  const likedStar = await likedStarsRepository.createStartoLiked(
    starId,
    userId
  );

  return { id: likedStar.starId };
};
