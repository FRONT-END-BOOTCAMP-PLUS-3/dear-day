import { NextRequest, NextResponse } from "next/server";

import { getUserIdFromToken } from "@/utils/auth";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { PgReservationRepository } from "@/infrastructure/repositories/PgReservationRepository";
import { PgReservationSettingRepository } from "@/infrastructure/repositories/PgReservationSettingRepository";
import { PgWaitingRepository } from "@/infrastructure/repositories/PgWaitingRepository";
import { ticketUsecase } from "@/application/usecases/ticket/TicketUsecase";
import { PgUserRepository } from "@/infrastructure/repositories/PgUserRepository";

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
