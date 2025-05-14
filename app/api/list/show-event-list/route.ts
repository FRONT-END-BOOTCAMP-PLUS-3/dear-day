import { NextResponse } from "next/server";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";
import { ShowEventList } from "@/application/usecases/list/ShowEventList";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";

export async function GET() {
  try {
    const eventRepository = new PgEventRepository();
    const starRepository = new PgStarRepository();

    const eventList: ShowEventListDto[] = await ShowEventList(
      eventRepository,
      starRepository
    );

    return NextResponse.json(eventList);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 API 요청 처리 중 오류 발생:", error);
    }
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
