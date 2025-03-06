import { NextResponse } from "next/server";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { ShowEventListDto } from "@/application/usecases/list/dto/ShowEventListDto";
import { ShowEventList } from "@/application/usecases/list/ShowEventList";

export async function GET() {
  try {
    const eventRepository = new PgEventRepository();

    const eventList: ShowEventListDto[] = await ShowEventList(eventRepository);

    return NextResponse.json(
      { message: "모든 이벤트 목록", eventList },
      { status: 200 }
    );
  } catch (error) {
    console.error("API 요청 처리 중 오류 발생:", error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
