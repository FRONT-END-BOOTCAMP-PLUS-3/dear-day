import { StarRepository } from "@/domain/repositories/StarRepository";
import { searchStarListDto } from "./dto/SearchStarListDto";

export const searchStarUsecase = async (
  starRepository: StarRepository,
  keyword: string
): Promise<searchStarListDto[]> => {
  const stars = keyword.trim()
    ? await starRepository.searchStarByKeyword(keyword)
    : [];

  const starList: searchStarListDto[] = stars.map((star) => ({
    id: star.id,
    image: star.image,
    name: star.group
      ? `${star.stageName}(${star.group})`
      : star.stageName || star.realName || "Unknown",
  }));

  return starList;
};
