import { LikedStarsRepository } from "@/domain/repositories/LikedStarsRepository";
import { CreateLikedStarDto } from "./dto/CreateLikedStarDto";
import { LikedStar } from "@prisma/client";

export const createLikedStarUsecase = async (
  likedStarsRepository: LikedStarsRepository,
  data: CreateLikedStarDto
) => {
  const newData: LikedStar = {
    userId: data.userId,
    starId: data.starId,
    createdAt: new Date(),
  };

  await likedStarsRepository.createLikedStar(newData);
};
