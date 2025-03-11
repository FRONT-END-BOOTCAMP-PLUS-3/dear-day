import { waitingCardViewUsecase } from "@/application/usecases/mypage/WaitingCardViewUsecase";
import { PgWaitingRepository } from "@/infrastructure/repositories/PgWaitingRepository";
import { getUserIdFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = await getUserIdFromToken();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const waitingRepo = new PgWaitingRepository();
  const waitingCardData = await waitingCardViewUsecase(userId, waitingRepo);
  return NextResponse.json(waitingCardData, { status: 200 });
}
