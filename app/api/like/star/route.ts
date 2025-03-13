import { createLikedStar } from "@/application/usecases/like/CreateLikedStar";
import { deleteLikedStarUsecase } from "@/application/usecases/like/DeleteLikedStar";
import { LikedStarUsecase } from "@/application/usecases/like/LikedStar";
import { PgLikedStarsRepository } from "@/infrastructure/repositories/PgLikedStarsRepository";
import { getUserIdFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = await getUserIdFromToken();
  if (!userId) {
    return NextResponse.json(false, { status: 200 });
  }

  const { searchParams } = new URL(req.url);
  const starId = Number(searchParams.get("starId"));
  if (!starId) {
    return NextResponse.json({ error: "starId 필요합니다." }, { status: 400 });
  }

  try {
    const repository = new PgLikedStarsRepository();
    const result = await LikedStarUsecase(starId, userId, repository);

    if (result === false) {
      return NextResponse.json(false, { status: 200 });
    }
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 API 요청 처리 중 오류 발생:", error);
    }
    return NextResponse.json(
      {
        error: "서버 오류 발생",
        details: error instanceof Error ? error.message : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const userId = await getUserIdFromToken();
  if (!userId) {
    return NextResponse.json(
      { error: "userId가 필요합니다." },
      { status: 401 }
    );
  }
  try {
    const body = await req.json();
    const { starId } = body;
    if (!starId) {
      return NextResponse.json(
        { error: "starId 필요합니다." },
        { status: 400 }
      );
    }

    const repository = new PgLikedStarsRepository();
    const result = await createLikedStar(starId, userId, repository);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 API 요청 처리 중 오류 발생:", error);
    }
    return NextResponse.json(
      {
        error: "서버 오류 발생",
        details: error instanceof Error ? error.message : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}

// 좋아요한 스타 삭제하기 (DELETE)
export async function DELETE(req: Request) {
  const userId = await getUserIdFromToken();
  if (!userId) {
    return NextResponse.json(
      { error: "userId가 필요합니다." },
      { status: 401 }
    );
  }
  try {
    const body = await req.json();
    const { starId } = body;
    if (!starId) {
      return NextResponse.json(
        { error: "starId 필요합니다." },
        { status: 400 }
      );
    }

    const repository = new PgLikedStarsRepository();
    await deleteLikedStarUsecase(starId, userId, repository);

    return NextResponse.json(
      { message: "좋아요한 스타 삭제 완료" },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 API 요청 처리 중 오류 발생:", error);
    }
    return NextResponse.json(
      {
        error: "서버 오류 발생",
        details: error instanceof Error ? error.message : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
