import { PgCourseRepository } from "@/infrastructure/repositories/PgCourseRepository";
import { PgCourseEventRepository } from "@/infrastructure/repositories/PgCourseEventRepository";
import { CreateCourse } from "@/application/usecases/course/CreateCourse";
import { getUserIdFromToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromToken();

    if (!userId) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, date, courseEvent } = body;

    if (!name || !date || !courseEvent) {
      return NextResponse.json(
        { error: "name, date, courseEvent가 필요합니다." },
        { status: 400 }
      );
    }

    const courseRepository = new PgCourseRepository();
    const courseEventRepository = new PgCourseEventRepository();

    const result = await CreateCourse(
      userId,
      name,
      date,
      courseEvent,
      courseRepository,
      courseEventRepository
    );

    return NextResponse.json(
      { message: "코스 생성 완료", courseData: result },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 API 요청 중 오류 발생:", error);
    }
    return NextResponse.json(
      {
        message: "서버 오류 발생",
        details: error instanceof Error ? error.message : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
