import { ShowCourseList } from "@/application/usecases/course/ShowCourseList";
import { PgCourseEventRepository } from "@/infrastructure/repositories/PgCourseEventRepository";
import { PgCourseRepository } from "@/infrastructure/repositories/PgCourseRepository";
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

    try {
      const course = await ShowCourseList(
        userId,
        courseRepository,
        courseEventRepository
      );
      return NextResponse.json(course);
    } catch (error) {
      if (error.message === "코스 목록을 찾을 수 없습니다.") {
        return NextResponse.json(
          { error: "코스 목록을 찾을 수 없습니다." },
          { status: 404 }
        );
      }
      throw error; // 다른 예상치 못한 에러는 그대로 던짐
    }
  } catch (error) {
    console.error("서버 오류 발생:", error);
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
