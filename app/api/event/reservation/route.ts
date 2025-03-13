import { NextRequest, NextResponse } from "next/server";
import { PgReservationRepository } from "@/infrastructure/repositories/PgReservationRepository";
import { CheckReservationAvailability } from "@/application/usecases/event/CheckReservationAvailability";

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
    const reservationRepository = new PgReservationRepository();

    try {
      const reservationList = await CheckReservationAvailability(
        eventId,
        reservationRepository
      );
      return NextResponse.json(reservationList);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "이벤트를 찾을 수 없습니다."
      ) {
        return NextResponse.json(
          { error: "예약 목록을 찾을 수 없습니다." },
          { status: 404 }
        );
      }
      throw error; // 다른 예상치 못한 에러는 그대로 던짐
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 API 요청 처리 중 오류 발생:", error);
    }
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
