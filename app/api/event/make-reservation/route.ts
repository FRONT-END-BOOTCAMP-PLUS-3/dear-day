import { MakeReservationDto } from "@/application/usecases/event/dto/MakeReservationDto";
import { PgReservationRepository } from "@/infrastructure/repositories/PgReservationRepository";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromToken } from "@/utils/auth";
import { MakeReservation } from "@/application/usecases/event/MakeReservation";
import { PgReservationSettingRepository } from "@/infrastructure/repositories/PgReservationSettingRepository";
import { ReservationLimitExceededError } from "@/application/usecases/event/MakeReservation"; // 에러 임포트 추가

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
    const { eventId, date, time } = body;

    if (!eventId || !date || !time) {
      return NextResponse.json(
        { error: "eventId, date, time이 필요합니다." },
        { status: 400 }
      );
    }

    const reservationData: MakeReservationDto = {
      userId,
      eventId: Number(eventId),
      selectedDate: date,
      selectedTime: time,
    };

    const reservationRepository = new PgReservationRepository();
    const reservationSettingRepository = new PgReservationSettingRepository();

    try {
      await MakeReservation(
        reservationData,
        reservationRepository,
        reservationSettingRepository
      );
    } catch (error) {
      if (error instanceof ReservationLimitExceededError) {
        return NextResponse.json(
          { error: "예약 가능 인원을 초과했습니다." },
          { status: 409 }
        );
      }
      throw error; // 다른 에러는 그대로 throw하여 아래에서 처리
    }

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
