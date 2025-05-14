import { ShowUpcomingEvents } from "@/application/usecases/event/ShowUpcomingEvents";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { NextResponse } from "next/server";

export async function GET() {
  const date = new Date();

  try {
    const eventRepository = new PgEventRepository();
    const starRepository = new PgStarRepository();

    try {
      const eventDetail = await ShowUpcomingEvents(
        date,
        eventRepository,
        starRepository
      );
      if (!eventDetail) {
        return NextResponse.json(
          { error: "이벤트 데이터를 찾을 수 없습니다." },
          { status: 404 }
        );
      }
      return NextResponse.json(eventDetail);
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message === "다가오는 이벤트를 찾을 수 없습니다."
      ) {
        return NextResponse.json(
          { error: "다가오는 이벤트를 찾을 수 없습니다." },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 서버 오류 발생:", error);
    }
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
