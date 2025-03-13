import { StarRepository } from "@/domain/repositories/StarRepository";
import { CreateStarDto } from "./dto/CreateStarDto";
import { Star } from "@prisma/client";
import path from "path";
import fs from "fs";

export const createStarUsecase = async (
  starRepository: StarRepository,
  data: CreateStarDto,
  imageFile: File
): Promise<void> => {
  const uploadFolder = path.join(process.cwd(), "/demo/star"); // 이미지 저장될 경로

  // 폴더가 없으면 생성
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true }); // 하위 폴더까지 생성 가능
  }

  // 파일 저장 (fs.createWriteStream 사용)
  const fileName = `${Date.now()}_${imageFile.name}`; // 파일명 중복 방지
  const filePath = path.join(uploadFolder, fileName);

  const fileStream = fs.createWriteStream(filePath);
  fileStream.write(Buffer.from(await imageFile.arrayBuffer()));
  fileStream.end(); // 스트림 종료

  const imageUrl = `/demo/star/${fileName}`;

  const newData: Star = {
    id: 0,
    createdAt: new Date(),
    image: imageUrl,
    realName: data.realName ?? null,
    stageName: data.stageName,
    group: data.group ?? null,
    birthday: data.birthday,
  };

  await starRepository.createStar(newData);
};
