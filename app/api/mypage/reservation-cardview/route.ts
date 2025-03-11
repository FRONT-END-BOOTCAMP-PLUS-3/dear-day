import { reservationCardViewUsecase } from "@/application/usecases/mypage/ReservationCardViewUsecase";
import { PgReservationRepository } from "@/infrastructure/repositories/PgReservationRepository";
import { getUserIdFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = await getUserIdFromToken();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reservationRepo = new PgReservationRepository();
  const reservationCardData = await reservationCardViewUsecase(
    userId,
    reservationRepo
  );
  return NextResponse.json(reservationCardData, { status: 200 });
}
