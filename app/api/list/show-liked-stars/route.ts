import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/utils/auth";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { PgLikedStarsRepository } from "@/infrastructure/repositories/PgLikedStarsRepository";
import { ShowLikedStar } from "@/application/usecases/list/ShowLikedStar";
import { ShowLikedStarDto } from "@/application/usecases/list/dto/ShowLikedStarDto";

export async function GET() {
  try {
    const userId = await getUserIdFromToken();

    if (!userId) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 403 } // 로그인 하지 않은 경우 403 에러코드 반환하도록
      );
    }

    const starRepository = new PgStarRepository();
    const likeStarsRepository = new PgLikedStarsRepository();

    const likedStarsInfo: ShowLikedStarDto[] = await ShowLikedStar(
      starRepository,
      likeStarsRepository,
      userId
    );

    return NextResponse.json(likedStarsInfo);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 API 요청 처리 중 오류 발생:", error);
    }
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
