import { showMyEventListUsecase } from "@/application/usecases/event/ShowMyEventListUsecase";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { getUserIdFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = await getUserIdFromToken();

  try {
    if (!userId) {
      return NextResponse.json(
        { error: "starId를 찾을 수 없습니다." },
        { status: 400 }
      );
    }

    const eventRepository = new PgEventRepository();
    const starRepository = new PgStarRepository();
    const results = await showMyEventListUsecase(
      userId,
      eventRepository,
      starRepository
    );

    return NextResponse.json(
      { message: "이벤트 검색 완료", results },
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
