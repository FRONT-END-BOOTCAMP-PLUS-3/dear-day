import { createLikedStarUsecase } from "@/application/usecases/mypage/CreateLikedStarUsecase";
import { CreateLikedStarDto } from "@/application/usecases/mypage/dto/CreateLikedStarDto";
import { PgLikedStarsRepository } from "@/infrastructure/repositories/PgLikedStarsRepository";
import { getUserIdFromToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { starId } = await req.json();
    if (!starId) {
      return NextResponse.json(
        { error: "starId is required" },
        { status: 400 }
      );
    }

    const data: CreateLikedStarDto = {
      userId: userId,
      starId: starId,
    };

    const likedStarsRepository = new PgLikedStarsRepository();
    await createLikedStarUsecase(likedStarsRepository, data);

    return NextResponse.json(
      { message: "스타 추가 완료", starId },
      { status: 200 }
    );
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
