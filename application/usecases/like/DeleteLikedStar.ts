import { LikedStarsRepository } from "@/domain/repositories/LikedStarsRepository";

export const deleteLikedStarUsecase = async (
  starId: number,
  userId: string,
  likedStarRepository: LikedStarsRepository
): Promise<void> => {
  await likedStarRepository.deleteLikedStarByStarId(starId, userId);
};
