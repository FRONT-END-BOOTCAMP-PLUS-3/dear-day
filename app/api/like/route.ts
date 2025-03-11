import { createLikedEventUsecase } from "@/application/usecases/like/CreateLikedEvent";
import { deleteLikedEventUsecase } from "@/application/usecases/like/DeleteLikedEvent";
import { LikedEventUsecase } from "@/application/usecases/like/LikedEvent";
import { PgLikedEventRepository } from "@/infrastructure/repositories/PgLikedEventsRepository";
import { getUserIdFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

// 좋아요한 이벤트 조회 (GET)
export async function GET(req: Request) {
  const userId = await getUserIdFromToken();
  if (!userId) {
    return NextResponse.json(false, { status: 200 });
  }

  const { searchParams } = new URL(req.url);
  const eventIdStr = searchParams.get("eventId");
  if (!eventIdStr) {
    return NextResponse.json(
      { error: "eventId가 필요합니다." },
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

  try {
    const repository = new PgLikedEventRepository();
    const result = await LikedEventUsecase(eventId, userId, repository);

    if (result === false) {
      return NextResponse.json(false, { status: 200 });
    }
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
    const { eventId } = body;
    if (eventId === undefined) {
      return NextResponse.json(
        { error: "eventId가 필요합니다." },
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
  if (!userId) {
    return NextResponse.json(
      { error: "userId가 필요합니다." },
      { status: 401 }
    );
  }
  try {
    const body = await req.json();
    const { eventId } = body;
    if (eventId === undefined) {
      return NextResponse.json(
        { error: "eventId가 필요합니다." },
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
