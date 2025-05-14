import { CreateStarDto } from "@/application/usecases/star/dto/CreateStarDto";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { NextRequest, NextResponse } from "next/server";
import { createStarUsecase } from "@/application/usecases/star/CreateStarUsecase";

export const config = {
  api: {
    bodyParser: false, // form-data 처리를 위해 Next.js 기본 bodyParser 비활성화
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const imageFile = formData.get("image") as File;
    if (!imageFile) {
      return NextResponse.json(
        { message: "이미지가 필요합니다." },
        { status: 400 }
      );
    }

    const starData: CreateStarDto = {
      image: "",
      stageName: formData.get("stageName")?.toString() || "",
      realName: formData.get("realName")?.toString() || "",
      group: formData.get("group")?.toString() || "",
      birthday: new Date(formData.get("birthday")?.toString() || ""),
    };

    const starRepository = new PgStarRepository();
    await createStarUsecase(starRepository, starData, imageFile);

    return NextResponse.json(
      { message: "스타 등록 완료", data: starData },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 API 요청 처리 중 오류 발생:", error);
    }
    return NextResponse.json(
      NextResponse.json({ message: "서버 오류 발생" }, { status: 500 })
    );
  }
}
