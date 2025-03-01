import { StarRepository } from "@/domain/repositories/StarRepository";
import { CreateStarDto } from "./dto/CreateStarDto";
import { Star } from "@prisma/client";

export const createStarUsecase = async (
  starRepository: StarRepository,
  data: CreateStarDto
): Promise<void> => {
  const newData: Star = {
    id: 0,
    createdAt: new Date(),
    image: data.image,
    realName: data.realName ?? null,
    stageName: data.stageName,
    group: data.group ?? null,
    birthday: data.birthday,
  };

  await starRepository.createStar(newData);
};
