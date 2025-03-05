import { ShowWaitingCount } from "@/application/usecases/event/ShowWaitingCount";
import { PgWaitingRepository } from "@/infrastructure/repositories/PgWaitingRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId } = body;

    if (!eventId) {
      return NextResponse.json(
        { error: "eventId가 필요합니다." },
        { status: 400 }
      );
    }
    const waitingRepository = new PgWaitingRepository();

    try {
      const data = await ShowWaitingCount(eventId, waitingRepository);
      return NextResponse.json(data);
    } catch (error) {
      if (error.message === "대기 목록을 찾을 수 없습니다.") {
        return NextResponse.json(
          { error: "대기 목록을 찾을 수 없습니다." },
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
