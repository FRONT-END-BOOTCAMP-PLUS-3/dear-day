import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/utils/auth";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { PgLikedStarsRepository } from "@/infrastructure/repositories/PgLikedStarsRepository";
import { ShowLikedStar } from "@/application/usecases/list/ShowLikedStar";
import { ShowLikedStarDto } from "@/application/usecases/list/dto/ShowLikedStarDto";

export async function POST() {
  try {
    const userId = await getUserIdFromToken();

    if (!userId) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const starRepository = new PgStarRepository();
    const likeStarsRepository = new PgLikedStarsRepository();

    const likedStarsInfo: ShowLikedStarDto[] = await ShowLikedStar(
      starRepository,
      likeStarsRepository,
      userId
    );

    return NextResponse.json(
      { message: "좋아요한 스타 목록", likedStarsInfo },
      { status: 200 }
    );
  } catch (error) {
    console.error("API 요청 처리 중 오류 발생:", error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
