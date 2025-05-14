import { showStarProfileUsecase } from "@/application/usecases/star/ShowStarProfileUsecase";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const starId = Number(searchParams.get("starId"));

    if (isNaN(starId)) {
      return NextResponse.json(
        { error: "유효한 starId를 제공해야 합니다." },
        { status: 400 }
      );
    }

    const starRepository = new PgStarRepository();
    const results = await showStarProfileUsecase(starId, starRepository);

    if (!results) {
      return NextResponse.json(
        { error: "해당 스타를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "스타 검색 완료", data: results },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 API 요청 처리 중 오류 발생:", error);
    }
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
