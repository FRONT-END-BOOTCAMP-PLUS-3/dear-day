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
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 코스 목록 오류 발생:", error);
      }
      return NextResponse.json(
        { error: "코스 목록을 찾을 수 없습니다." },
        { status: 404 }
      );
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 서버 오류 발생:", error);
    }
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}

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
    const { courseId, events } = body;
    if (!courseId || !events || !Array.isArray(events)) {
      return NextResponse.json(
        { error: "잘못된 입력입니다." },
        { status: 400 }
      );
    }

    const courseEventRepository = new PgCourseEventRepository();
    const results = await Promise.all(
      events.map((eventId: number, index: number) =>
        courseEventRepository.createCourseEvent(courseId, eventId, index + 1)
      )
    );
    return NextResponse.json({ success: true, results });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 코스 이벤트 생성 중 오류 발생:", error);
    }
    return NextResponse.json(
      { error: "코스 이벤트 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { courseId, events } = body;
    if (!courseId || !events || !Array.isArray(events)) {
      return NextResponse.json(
        { error: "잘못된 입력입니다." },
        { status: 400 }
      );
    }

    const courseEventRepository = new PgCourseEventRepository();
    await Promise.all(
      events.map((eventId: number) =>
        courseEventRepository.deleteCourseEvent(courseId, eventId)
      )
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 코스 이벤트 삭제 중 오류 발생:", error);
    }
    return NextResponse.json(
      { error: "코스 이벤트 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, order } = body;
    if (!id || !order || !Array.isArray(id) || !Array.isArray(order)) {
      return NextResponse.json(
        { error: "잘못된 입력입니다." },
        { status: 400 }
      );
    }

    const courseEventRepository = new PgCourseEventRepository();

    await Promise.all(
      id.map((eventId: number, index: number) =>
        courseEventRepository.updateCourseEvent(eventId, order[index])
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 코스 이벤트 순서 업데이트 중 오류 발생:", error);
    }

    return NextResponse.json(
      { error: "코스 이벤트 순서 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
