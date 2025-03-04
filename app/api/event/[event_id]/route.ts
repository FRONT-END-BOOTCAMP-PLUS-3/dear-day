import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/utils/auth"; // 공통 함수 가져오기
import { ShowEventDetail } from "@/application/usecases/event/ShowEventDetail";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { PgReservationSettingRepository } from "@/infrastructure/repositories/PgReservationSettingRepository";
import { PgReservationRepository } from "@/infrastructure/repositories/PgReservationRepository";
import { PgWaitingRepository } from "@/infrastructure/repositories/PgWaitingRepository";

export async function GET(req: Request) {
  try {
    // 인증 처리 (공통 함수 사용)
    const userId = await getUserIdFromToken();

    if (!userId) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
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
