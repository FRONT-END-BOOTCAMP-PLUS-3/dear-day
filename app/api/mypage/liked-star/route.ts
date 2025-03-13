import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/utils/auth";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { showUserLikedStarUsecase } from "@/application/usecases/mypage/ShowUserLikedStarUsecase";

export async function GET() {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const starRepository = new PgStarRepository();
    const likedStars = await showUserLikedStarUsecase(
      starRepository,
      userId as string
    );

    return NextResponse.json(likedStars, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 API 요청 처리 중 오류 발생:", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
