import { updateWaitingStatusUsecase } from "@/application/usecases/manage/UpdateWaitingStatusUsecase";
import { PgWaitingRepository } from "@/infrastructure/repositories/PgWaitingRepository";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { waitingId, status } = body;

    if (!waitingId || !status) {
      return NextResponse.json(
        { message: "예약 ID와 상태가 필요합니다." },
        { status: 400 }
      );
    }

    const waitingRepository = new PgWaitingRepository();
    const result = await updateWaitingStatusUsecase(
      waitingId,
      status,
      waitingRepository
    );

    if (!result.success) {
      return NextResponse.json({ message: "예약을 찾을 수 없습니다" });
    }

    return NextResponse.json(
      { message: "예약 상태 변경 완료", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("서버 오류:", error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
