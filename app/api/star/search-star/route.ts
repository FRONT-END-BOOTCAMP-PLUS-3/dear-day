import { searchStarUsecase } from "@/application/usecases/star/SearchStarUsecase";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword") || "";
  try {
    const starRepository = new PgStarRepository();
    const results = await searchStarUsecase(starRepository, keyword);

    return NextResponse.json(
      { message: "스타 검색 완료", data: results },
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
