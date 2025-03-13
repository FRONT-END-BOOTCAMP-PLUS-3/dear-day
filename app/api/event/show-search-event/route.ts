import { searchEventListByStarUsecase } from "@/application/usecases/event/SearchEventListByStarUsecase";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const starId = searchParams.get("star_id");

    if (!starId) {
      return NextResponse.json(
        { error: "starId를 찾을 수 없습니다." },
        { status: 400 }
      );
    }

    const parsedStarId = parseInt(starId);

    const eventRepository = new PgEventRepository();
    const starRepository = new PgStarRepository();
    const results = await searchEventListByStarUsecase(
      parsedStarId,
      eventRepository,
      starRepository
    );

    return NextResponse.json(
      { message: "이벤트 검색 완료", data: results },
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
