import { LikedStarsRepository } from "@/domain/repositories/LikedStarsRepository";
import { LikedStarDto } from "./dto/LikedStarDto";

export const LikedStarUsecase = async (
  starId: number,
  userId: string,
  likedStarRepository: LikedStarsRepository
): Promise<LikedStarDto | false> => {
  const likedStar = await likedStarRepository.findLikedStarByStarId(
    starId,
    userId
  );

  if (!likedStar) {
    return false;
  }

  return { id: likedStar.starId };
};
