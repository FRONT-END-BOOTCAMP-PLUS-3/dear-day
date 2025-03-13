import { updateReservationStatusUsecase } from "@/application/usecases/manage/UpdateReservationStatusUsecase";
import { PgReservationRepository } from "@/infrastructure/repositories/PgReservationRepository";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { reservationId, status } = body;

    if (!reservationId || !status) {
      return NextResponse.json(
        { message: "예약 ID와 상태가 필요합니다." },
        { status: 400 }
      );
    }

    const reservationRepository = new PgReservationRepository();
    const result = await updateReservationStatusUsecase(
      reservationId,
      status,
      reservationRepository
    );

    if (!result.success) {
      return NextResponse.json({ message: "예약을 찾을 수 없습니다" });
    }

    return NextResponse.json(
      { message: "예약 상태 변경 완료", result },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 API 요청 처리 중 오류 발생:", error);
    }
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
