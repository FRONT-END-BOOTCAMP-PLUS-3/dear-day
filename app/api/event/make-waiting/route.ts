import { PgWaitingRepository } from "@/infrastructure/repositories/PgWaitingRepository";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromToken } from "@/utils/auth";
import { MakeWaitingDto } from "@/application/usecases/event/dto/MakeWaitingDto";
import { MakeWaiting } from "@/application/usecases/event/MakeWaiting";

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
    const { eventId, headCount } = body;

    if (!eventId || !headCount) {
      return NextResponse.json(
        { error: "eventId, headCount이 필요합니다." },
        { status: 400 }
      );
    }

    const waitingData: MakeWaitingDto = {
      userId,
      eventId,
      headCount,
    };

    const waitingRepository = new PgWaitingRepository();
    await MakeWaiting(waitingData, waitingRepository);

    return NextResponse.json(
      { message: "예약 완료", waitingData },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 API 요청 처리 중 오류 발생:", error);
    }
    return NextResponse.json(
      NextResponse.json({ message: "서버 오류 발생" }, { status: 500 })
    );
  }
}
