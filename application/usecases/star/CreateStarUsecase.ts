import StarRepository from "@/domain/repositories/StarRepository";
import { CreateStarDto } from "./dto/CreateStarDto";
import { Star } from "@prisma/client";

export const createStarUsecase = async (
  starRepository: StarRepository,
  data: CreateStarDto
): Promise<void> => {
  // Blob -> ArrayBuffer 변환
  const arrayBuffer = await data.image.arrayBuffer();

  const newData: Star = {
    id: 0,
    createdAt: new Date(),
    image: new Uint8Array(arrayBuffer),
    realName: data.realName ?? null,
    stageName: data.stageName,
    group: data.group ?? null,
    birthday: data.birthday,
  };

  await starRepository.createStar(newData);
};
