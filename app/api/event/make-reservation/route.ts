import { MakeReservationDto } from "@/application/usecases/event/dto/MakeReservationDto";
import { PgReservationRepository } from "@/infrastructure/repositories/PgReservationRepository";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromToken } from "@/utils/auth";
import { MakeReservation } from "@/application/usecases/event/MakeReservation";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromToken();

    if (!userId) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const eventId = Number(searchParams.get("eventId"));
    const date = searchParams.get("date");
    const time = searchParams.get("time");

    if (!eventId || !date || !time) {
      return NextResponse.json(
        { error: "eventId, date, time이 필요합니다." },
        { status: 400 }
      );
    }

    const reservationData: MakeReservationDto = {
      userId,
      eventId,
      selectedDate: date,
      selectedTime: time,
    };

    const reservationRepository = new PgReservationRepository();
    await MakeReservation(reservationData, reservationRepository);

    return NextResponse.json(
      { message: "예약 완료", reservationData },
      { status: 201 }
    );
  } catch (error) {
    console.error("API 요청 처리 중 오류 발생:", error);
    return NextResponse.json(
      NextResponse.json({ message: "서버 오류 발생" }, { status: 500 })
    );
  }
}
