import { StarRepository } from "@/domain/repositories/StarRepository";
import { StarProfileDto } from "./dto/StarProfileDto";

export const showStarProfileUsecase = async (
  starId: number,
  starRepository: StarRepository
): Promise<StarProfileDto> => {
  return await starRepository.findStarProfile(starId);
};
