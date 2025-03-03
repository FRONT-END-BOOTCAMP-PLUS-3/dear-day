import { CreateStarDto } from "@/application/usecases/star/dto/CreateStarDto";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { NextRequest, NextResponse } from "next/server";
import { createStarUsecase } from "@/application/usecases/star/CreateStarUsecase";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // form-data 처리를 위해 Next.js 기본 bodyParser 비활성화
  },
};

export async function POST(req: NextRequest) {
  try {
    const uploadFolder = path.join(process.cwd(), "public/demo/star"); // 이미지 저장될 경로

    // 폴더가 없으면 생성
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true }); // 하위 폴더까지 생성 가능
    }

    return new Promise(async (resolve) => {
      const formData = await req.formData();

      const imageFile = formData.get("image") as File;
      if (!imageFile) {
        return resolve(
          NextResponse.json(
            { message: "이미지가 필요합니다." },
            { status: 400 }
          )
        );
      }

      // 파일 저장 (fs.createWriteStream 사용)
      const fileName = `${Date.now()}_${imageFile.name}`; // 파일명 중복 방지
      const filePath = path.join(uploadFolder, fileName);

      const fileStream = fs.createWriteStream(filePath);
      fileStream.write(Buffer.from(await imageFile.arrayBuffer()));
      fileStream.end(); // 스트림 종료

      const imageUrl = `/demo/star/${fileName}`;

      const starData: CreateStarDto = {
        image: imageUrl,
        stageName: formData.get("stageName")?.toString() || "",
        realName: formData.get("realName")?.toString() || "",
        group: formData.get("group")?.toString() || "",
        birthday: new Date(formData.get("birthday")?.toString() || ""),
      };

      const starRepository = new PgStarRepository();
      await createStarUsecase(starRepository, starData);

      return resolve(
        NextResponse.json(
          { message: "스타 등록 완료", data: starData },
          { status: 201 }
        )
      );
    });
  } catch (error) {
    console.error("API 요청 처리 중 오류 발생:", error);
    return NextResponse.json(
      NextResponse.json({ message: "서버 오류 발생" }, { status: 500 })
    );
  }
}
