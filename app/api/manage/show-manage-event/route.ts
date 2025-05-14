import { showParticipantListUsecase } from "@/application/usecases/manage/ShowParticipantListUsecase";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { PgReservationRepository } from "@/infrastructure/repositories/PgReservationRepository";
import { PgUserRepository } from "@/infrastructure/repositories/PgUserRepository";
import { PgWaitingRepository } from "@/infrastructure/repositories/PgWaitingRepository";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const eventId = Number(url.searchParams.get("eventId"));

    const eventRepository = new PgEventRepository();
    const reservationRepository = new PgReservationRepository();
    const waitingRepository = new PgWaitingRepository();
    const userRepository = new PgUserRepository();

    const results = await showParticipantListUsecase(
      eventId,
      eventRepository,
      reservationRepository,
      waitingRepository,
      userRepository
    );

    return NextResponse.json(
      { message: "이벤트 상세 정보 검색 완료", results },
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
