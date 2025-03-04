import { createLikedEventUsecase } from "@/application/usecases/like/CreateLikedEvent";
import { deleteLikedEventUsecase } from "@/application/usecases/like/DeleteLikedEvent";
import { LikedEventUsecase } from "@/application/usecases/like/LikedEvent";
import { PgLikedEventRepository } from "@/infrastructure/repositories/PgLikedEventsRepository";
import { getUserIdFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

// 좋아요한 이벤트 전체 불러오기 (GET)
export async function GET(req: Request) {
  const userId = await getUserIdFromToken();

  try {
    const { searchParams } = new URL(req.url);
    const eventIdStr = searchParams.get("eventId");
    if (!eventIdStr || !userId) {
      return NextResponse.json(
        { error: "eventId와 userId가 필요합니다." },
        { status: 400 }
      );
    }
    const eventId = Number(eventIdStr);
    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: "올바른 eventId가 필요합니다." },
        { status: 400 }
      );
    }

    const repository = new PgLikedEventRepository();
    const result = await LikedEventUsecase(eventId, userId, repository);

    return NextResponse.json(result || {}, { status: 200 });
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

// 좋아요한 이벤트 추가하기 (POST)
export async function POST(req: Request) {
  const userId = await getUserIdFromToken();

  try {
    const body = await req.json();
    const { eventId } = body;
    if (eventId === undefined || !userId) {
      return NextResponse.json(
        { error: "eventId와 userId가 필요합니다." },
        { status: 400 }
      );
    }

    const repository = new PgLikedEventRepository();
    const result = await createLikedEventUsecase(eventId, userId, repository);

    return NextResponse.json(result, { status: 201 });
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

// 좋아요한 이벤트 삭제하기 (DELETE)
export async function DELETE(req: Request) {
  const userId = await getUserIdFromToken();

  try {
    const body = await req.json();
    const { eventId } = body;
    if (eventId === undefined || !userId) {
      return NextResponse.json(
        { error: "eventId와 userId가 필요합니다." },
        { status: 400 }
      );
    }

    const repository = new PgLikedEventRepository();
    await deleteLikedEventUsecase(eventId, userId, repository);

    return NextResponse.json(
      { message: "좋아요한 이벤트 삭제 완료" },
      { status: 200 }
    );
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
