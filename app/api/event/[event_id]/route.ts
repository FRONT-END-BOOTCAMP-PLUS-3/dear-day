import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ShowEventDetail } from "@/application/usecases/event/ShowEventDetail";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { PgReservationSettingRepository } from "@/infrastructure/repositories/PgReservationSettingRepository";
import { PgReservationRepository } from "@/infrastructure/repositories/PgReservationRepository";
import { PgWaitingRepository } from "@/infrastructure/repositories/PgWaitingRepository";
import { cookies } from "next/headers"; // 쿠키에서 토큰 가져오기

export async function GET(req: Request) {
  try {
    // 1. 쿠키에서 토큰 가져오기
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    // 2. 토큰 해석하여 userId 추출
    let userId: string;
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
        return NextResponse.json(
          { error: "유효하지 않은 토큰입니다." },
          { status: 401 }
        );
      }

      userId = decoded.id as string; // 기존 `let userId`에 할당
    } catch (error) {
      return NextResponse.json(
        { error: "유효하지 않은 토큰입니다." },
        { status: 401 }
      );
    }

    // 3. 유즈케이스에 `userId` 전달
    const { searchParams } = new URL(req.url);
    const eventId = Number(searchParams.get("[event_id]"));
    if (!eventId) {
      return NextResponse.json(
        { error: "eventId가 필요합니다." },
        { status: 400 }
      );
    }

    const eventRepository = new PgEventRepository();
    const starRepository = new PgStarRepository();
    const reservationSettingRepository = new PgReservationSettingRepository();
    const reservationRepository = new PgReservationRepository();
    const waitingRepository = new PgWaitingRepository();

    try {
      const eventDetail = await ShowEventDetail(
        eventId,
        userId,
        eventRepository,
        starRepository,
        reservationSettingRepository,
        reservationRepository,
        waitingRepository
      );
      return NextResponse.json(eventDetail);
    } catch (error) {
      if (error.message === "이벤트를 찾을 수 없습니다.") {
        return NextResponse.json(
          { error: "이벤트를 찾을 수 없습니다." },
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
