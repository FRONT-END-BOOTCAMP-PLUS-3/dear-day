import { getEventByEventIdUsecase } from "@/application/usecases/manage/GetEventByEventIdUsecase";
import { updateEventUsecase } from "@/application/usecases/manage/UpdateEventUsecase";
import { PgEventRepository } from "@/infrastructure/repositories/PgEventRepository";
import { PgReservationSettingRepository } from "@/infrastructure/repositories/PgReservationSettingRepository";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();
    const { searchParams } = new URL(req.url);
    const eventId = Number(searchParams.get("eventId"));

    const mainImageEntry = formData.get("mainImage");
    const mainImageFile =
      mainImageEntry instanceof Blob ? (mainImageEntry as File) : null;

    const detailImageFiles = formData
      .getAll("detailImage")
      .filter((file) => file instanceof Blob) as File[];

    // JSON 데이터 추출
    const eventDataString = formData.get("eventData");
    const eventData = eventDataString
      ? JSON.parse(eventDataString as string)
      : {};

    console.log("서버에서 받은 eventData:", eventData);

    if (!eventId) {
      return NextResponse.json(
        { message: "이벤트 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const eventRepository = new PgEventRepository();
    const reservationSettingRepository = new PgReservationSettingRepository();
    const result = await updateEventUsecase(
      eventId,
      eventData,
      mainImageFile,
      detailImageFiles,
      eventRepository,
      reservationSettingRepository
    );

    if (!result.success) {
      return NextResponse.json({ message: "이벤트 조회 실패" });
    }

    return NextResponse.json({ message: "이벤트 수정 완료" }, { status: 201 });
  } catch (error) {
    console.error("서버 오류:", error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = Number(searchParams.get("eventId"));

    if (!eventId) {
      return NextResponse.json(
        { message: "이벤트 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const eventRepository = new PgEventRepository();
    const reservationSettingRepository = new PgReservationSettingRepository();
    const event = await getEventByEventIdUsecase(
      eventId,
      eventRepository,
      reservationSettingRepository
    );

    return NextResponse.json(
      { message: "이벤트 조회 완료", event },
      { status: 201 }
    );
  } catch (error) {
    console.error("서버 오류:", error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
