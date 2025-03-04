import { ShowUpcomingEvents } from "@/application/usecases/event/ShowUpcomingEvents";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { getUserIdFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await getUserIdFromToken();

    if (!userId) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const eventRepository = new PgEventRepository();
    const starRepository = new PgStarRepository();

    try {
      const eventDetail = await ShowUpcomingEvents(
        new Date(),
        eventRepository,
        starRepository
      );
      return NextResponse.json(eventDetail);
    } catch (error) {
      if (error.message === "이벤트를 찾을 수 없습니다.") {
        return NextResponse.json(
          { error: "이벤트를 찾을 수 없습니다." },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("서버 오류 발생:", error);
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
