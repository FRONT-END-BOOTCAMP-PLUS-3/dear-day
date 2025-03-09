import { LikedEventListUsecase } from "@/application/usecases/like/LikedEventList";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { PgLikedEventRepository } from "@/infrastructure/repositories/PgLikedEventsRepository";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { getUserIdFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = await getUserIdFromToken();

  try {
    if (!userId) {
      return NextResponse.json(
        { error: "userId가 필요합니다." },
        { status: 400 }
      );
    }

    const likedEventRepository = new PgLikedEventRepository();
    const eventRepository = new PgEventRepository();
    const starRepository = new PgStarRepository();
    const result = await LikedEventListUsecase(
      userId,
      starRepository,
      likedEventRepository,
      eventRepository
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("서버 오류 발생:", error);
    return NextResponse.json(
      {
        error: "서버 오류 발생",
        details: error instanceof Error ? error.message : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
