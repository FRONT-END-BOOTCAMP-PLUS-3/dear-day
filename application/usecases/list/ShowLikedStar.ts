import { LikedStarsRepository } from "@/domain/repositories/LikedStarsRepository";
import { StarRepository } from "@/domain/repositories/StarRepository";
import { ShowLikedStarDto } from "./dto/ShowLikedStarDto";

export const ShowLikedStar = async (
  starRepository: StarRepository,
  likeStarsRepository: LikedStarsRepository,
  userId: string
): Promise<ShowLikedStarDto[]> => {
  // 모든 스타 데이터 조회
  const stars = await starRepository.findAll();

  // 사용자가 좋아요한 스타 ID 조회
  const likedStars = await likeStarsRepository.findLikedStarsByUserId(userId);

  // 좋아요한 스타 정보를 찾아서 변환 + null 값 제거
  const likedStarsInfo: ShowLikedStarDto[] = likedStars
    .map((likedStar) => {
      const star = stars.find((s) => s.id === likedStar.starId);
      if (!star) return null; // 데이터가 없을 경우 null 반환
      return {
        starId: star.id,
        stageName: star.stageName,
        group: star.group,
      };
    })
    .filter((star) => star !== null); // null 값 제거

  return likedStarsInfo;
};
