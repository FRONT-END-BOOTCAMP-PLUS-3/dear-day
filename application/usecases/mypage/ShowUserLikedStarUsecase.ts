import { StarRepository } from "@/domain/repositories/StarRepository";
import { UserLikedStarDto } from "./dto/UserLikedStarDto";

export const showUserLikedStarUsecase = async (
  starRepository: StarRepository,
  userId: string
): Promise<UserLikedStarDto[]> => {
  return await starRepository.findLikedStarsByUserId(userId);
};
