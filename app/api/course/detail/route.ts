import { ShowCourseEvents } from "@/application/usecases/course/ShowCourseEvents";
import { PgCourseEventRepository } from "@/infrastructure/repositories/PgCourseEventRepository";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { getUserIdFromToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // 인증 처리 (공통 함수 사용)
    const userId = await getUserIdFromToken();

    if (!userId) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const courseId = Number(searchParams.get("courseId"));

    const courseEventRepository = new PgCourseEventRepository();
    const eventRepository = new PgEventRepository();
    const starRepository = new PgStarRepository();

    try {
      const course = await ShowCourseEvents(
        courseId,
        courseEventRepository,
        eventRepository,
        starRepository
      );
      return NextResponse.json(course);
    } catch (error) {
      console.error("코스 목록 오류 발생", error);
      return NextResponse.json(
        { error: "코스 목록을 찾을 수 없습니다." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("서버 오류 발생:", error);
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
