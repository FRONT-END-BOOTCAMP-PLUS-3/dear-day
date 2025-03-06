import { ShowCourseList } from "@/application/usecases/course/ShowCourseList";
import { PgCourseEventRepository } from "@/infrastructure/repositories/PgCourseEventRepository";
import { PgCourseRepository } from "@/infrastructure/repositories/PgCourseRepository";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { getUserIdFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 인증 처리 (공통 함수 사용)
    const userId = await getUserIdFromToken();

    if (!userId) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const courseRepository = new PgCourseRepository();
    const courseEventRepository = new PgCourseEventRepository();
    const eventRepository = new PgEventRepository();

    try {
      const course = await ShowCourseList(
        userId,
        courseRepository,
        eventRepository,
        courseEventRepository
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
