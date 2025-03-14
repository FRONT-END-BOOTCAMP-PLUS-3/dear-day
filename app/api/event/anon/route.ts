import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromToken } from "@/utils/auth"; // 공통 함수 가져오기
import { ShowEventDetail } from "@/application/usecases/event/ShowEventDetail";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { PgStarRepository } from "@/infrastructure/repositories/PgStarRepository";
import { PgReservationSettingRepository } from "@/infrastructure/repositories/PgReservationSettingRepository";
import { PgReservationRepository } from "@/infrastructure/repositories/PgReservationRepository";
import { PgWaitingRepository } from "@/infrastructure/repositories/PgWaitingRepository";
import { RegisterEventUsecase } from "@/application/usecases/event/RegisterEventUsecase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = Number(searchParams.get("eventId"));

    if (!eventId) {
      return NextResponse.json(
        { error: "eventId가 필요합니다." },
        { status: 400 }
      );
    }

    const eventRepository = new PgEventRepository();
    const starRepository = new PgStarRepository();
    const reservationSettingRepository = new PgReservationSettingRepository();
    const reservationRepository = new PgReservationRepository();
    const waitingRepository = new PgWaitingRepository();

    try {
      const eventDetail = await ShowEventDetail(
        eventId,
        eventRepository,
        starRepository,
        reservationSettingRepository,
        reservationRepository,
        waitingRepository
      );
      return NextResponse.json(eventDetail);
    } catch (error) {
      if ((error as Error).message === "이벤트를 찾을 수 없습니다.") {
        return NextResponse.json(
          { error: "이벤트를 찾을 수 없습니다." },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 서버 오류 발생:", error);
    }
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromToken();
    if (!userId)
      return NextResponse.json({ error: "인증 필요" }, { status: 401 });

    const formData = await req.formData();
    const eventData = JSON.parse(formData.get("eventData") as string);

    const mainImageFile = formData.get("mainImage");
    const detailImageFiles = formData.getAll("detailImage");

    const eventRepository = new PgEventRepository();
    const reservationSettingRepository = new PgReservationSettingRepository();
    const registerEventUsecase = new RegisterEventUsecase(
      eventRepository,
      reservationSettingRepository
    );

    const result = await registerEventUsecase.execute({
      ...eventData,
      userId,
      mainImageFile,
      detailImageFiles,
    });

    return NextResponse.json(
      {
        success: true,
        eventId: result.eventId,
        mainImage: result.mainImage,
        detailImage: result.detailImage,
      },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 이벤트 등록 중 오류 발생:", error);
    }
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
