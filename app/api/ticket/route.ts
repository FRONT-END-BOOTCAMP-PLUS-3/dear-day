import { NextRequest, NextResponse } from "next/server";

import { getUserIdFromToken } from "@/utils/auth";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { PgReservationRepository } from "@/infrastructure/repositories/PgReservationRepository";
import { PgReservationSettingRepository } from "@/infrastructure/repositories/PgReservationSettingRepository";
import { PgWaitingRepository } from "@/infrastructure/repositories/PgWaitingRepository";
import { ticketUsecase } from "@/application/usecases/ticket/TicketUsecase";
import { PgUserRepository } from "@/infrastructure/repositories/PgUserRepository";
import { deleteReservationUsecase } from "@/application/usecases/ticket/DeleteTicketUsecase";
import { deleteWaitingUsecase } from "@/application/usecases/ticket/DeleteTicketUsecase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const eventId = parseInt(searchParams.get("eventId") || "0");
  if (!eventId) {
    return NextResponse.json({ message: "Missing eventId" }, { status: 400 });
  }
  const userId = await getUserIdFromToken();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userRepo = new PgUserRepository();
  const eventRepo = new PgEventRepository();
  const reservationRepo = new PgReservationRepository();
  const reservationSettingRepo = new PgReservationSettingRepository();
  const waitingRepo = new PgWaitingRepository();
  const ticketData = await ticketUsecase(
    eventId,
    userId,
    userRepo,
    eventRepo,
    reservationRepo,
    reservationSettingRepo,
    waitingRepo
  );
  return NextResponse.json(ticketData, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const userId = await getUserIdFromToken();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const eventId = parseInt(searchParams.get("eventId") || "0");
  const mode = searchParams.get("mode");

  if (!eventId || isNaN(eventId) || !mode) {
    return NextResponse.json(
      { error: "유효한 eventId와 mode가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    let result;

    if (mode === "RESERVATION") {
      const reservationRepository = new PgReservationRepository();
      result = await deleteReservationUsecase(
        eventId,
        userId as string,
        reservationRepository
      );
    } else if (mode === "WAITING") {
      const waitingRepository = new PgWaitingRepository();
      result = await deleteWaitingUsecase(
        eventId,
        userId as string,
        waitingRepository
      );
    } else {
      return NextResponse.json(
        { error: "잘못된 mode 값입니다." },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "삭제 완료", result }, { status: 200 });
  } catch (error) {
    console.error("삭제 요청 실패:", error);
    return NextResponse.json(
      { error: "삭제 요청 처리 중 오류 발생" },
      { status: 500 }
    );
  }
}
