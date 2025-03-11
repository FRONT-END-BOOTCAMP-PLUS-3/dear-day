import { visitedEventUsecase } from "@/application/usecases/mypage/VisitedEventUsecase";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { getUserIdFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = await getUserIdFromToken();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const eventRepo = new PgEventRepository();
  const visitedEventData = await visitedEventUsecase(userId, eventRepo);
  return NextResponse.json(visitedEventData, { status: 200 });
}
