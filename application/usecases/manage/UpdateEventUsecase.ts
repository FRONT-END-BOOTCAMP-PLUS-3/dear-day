import { EventRepository } from "@/domain/repositories/EventRepository";
import { UpdateEventDto } from "./dto/UpdateEventDto";
import { ReservationSettingRepository } from "@/domain/repositories/ReservationSettingRepository";
import path from "path";
import fs from "fs";
import { UpdateEventDataDto } from "./dto/UpdateEventDataDto";

export const updateEventUsecase = async (
  eventId: number,
  eventData: UpdateEventDataDto,
  mainImageFile: File | null,
  detailImageFiles: File[] | null,
  eventRepository: EventRepository,
  reservationSettingRepository: ReservationSettingRepository
): Promise<UpdateEventDto> => {
  const saveFile = async (file: File, folder: string): Promise<string> => {
    const uploadFolder = path.join(
      process.cwd(),
      `public/demo/event/${folder}`
    );

    // 폴더가 존재하지 않으면 생성
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    // 현재 시간 + 파일 이름으로 저장 (파일명 충돌 방지)
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadFolder, fileName);

    // 파일을 저장
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    // 저장된 파일의 상대 경로 반환 (클라이언트에서 접근 가능하도록)
    return `/demo/event/${folder}/${fileName}`;
  };

  let mainImageUrl = eventData?.mainImage || "";

  // mainImageFile이 존재하면 새로 저장, 없으면 기존 이미지 경로 유지
  if (mainImageFile) {
    console.log("새 이미지 저장");
    mainImageUrl = await saveFile(mainImageFile, "main"); // 새 이미지 저장
  }

  let detailImages: string[] = eventData?.detailImage || [];

  // 기존 상세 이미지 삭제 후 새 이미지 저장
  if (detailImageFiles && detailImageFiles.length > 0) {
    detailImages = [];
    for (const file of detailImageFiles) {
      const imageUrl = await saveFile(file, "detail");
      detailImages.push(imageUrl);
    }
  }

  // event 테이블에 저장할 데이터 필터링
  const eventUpdateData = {
    placeName: eventData?.placeName,
    address: eventData?.address,
    latitude: eventData?.latitude,
    longitude: eventData?.longitude,
    title: eventData?.title,
    twitterId: eventData?.twitterId,
    startTime: eventData?.startTime,
    endTime: eventData?.endTime,
    startDate: eventData?.startDate,
    endDate: eventData?.endDate,
    mode: eventData?.mode,
    mainImage: mainImageUrl,
    detailImage: detailImages,
    benefits: eventData?.benefits,
  };

  // reservationSetting 테이블에 저장할 데이터 필터링
  const reservationUpdateData = {
    openAt: eventData?.openAt,
    breaktime: eventData?.breaktime,
    limit: eventData?.limit,
  };

  const updateEvent = await eventRepository.updateEventByEventId(
    eventId,
    eventUpdateData
  );

  if (!updateEvent) {
    return {
      success: false,
    };
  }

  const updateReservationSetting =
    await reservationSettingRepository.updateReservationSettingByEventId(
      eventId,
      reservationUpdateData
    );

  if (!updateReservationSetting) {
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
};
