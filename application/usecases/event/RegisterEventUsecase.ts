import path from "path";
import fs from "fs";
import { EventRepository } from "@/domain/repositories/EventRepository";
import { ReservationSettingRepository } from "@/domain/repositories/ReservationSettingRepository";
import { CreateEventRequestDto } from "@/application/usecases/event/dto/CreateEventRequestDto";
import { CreateReservationSettingRequestDto } from "@/application/usecases/event/dto/CreateReservationSettingRequestDto";

export class RegisterEventUsecase {
  private eventRepository: EventRepository;
  private reservationSettingRepository: ReservationSettingRepository;

  constructor(
    eventRepo: EventRepository,
    reservationRepo: ReservationSettingRepository
  ) {
    this.eventRepository = eventRepo;
    this.reservationSettingRepository = reservationRepo;
  }

  private async saveFile(file: File, folder: string): Promise<string> {
    const uploadFolder = path.join(
      process.env.DEMO_FOLDER_LOCATION || "/public",
      `/demo/event/${folder}`
    );

    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadFolder, fileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    return `/demo/event/${folder}/${fileName}`;
  }

  async execute(
    eventData: CreateEventRequestDto &
      Partial<CreateReservationSettingRequestDto> & {
        userId: string;
        mainImageFile?: File | null;
        detailImageFiles?: File[];
      }
  ): Promise<{
    success: boolean;
    eventId: number;
    mainImage: string;
    detailImage: string[];
  }> {
    let mainImageUrl = "";
    if (eventData.mainImageFile) {
      mainImageUrl = await this.saveFile(eventData.mainImageFile, "main");
    }

    const detailImages: string[] = [];
    if (eventData.detailImageFiles) {
      for (const file of eventData.detailImageFiles) {
        const imageUrl = await this.saveFile(file, "detail");
        detailImages.push(imageUrl);
      }
    }

    const eventToSave: CreateEventRequestDto = {
      userId: eventData.userId,
      starId: eventData.starId,
      placeName: eventData.placeName,
      address: eventData.address,
      latitude: eventData.latitude,
      longitude: eventData.longitude,
      title: eventData.title,
      twitterId: eventData.twitterId,
      startDate: new Date(eventData.startDate),
      endDate: new Date(eventData.endDate),
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      mode: eventData.mode,
      mainImage: mainImageUrl,
      detailImage: detailImages,
      benefits: eventData.benefits,
    };

    const eventId = await this.eventRepository.createEvent(eventToSave);

    if (
      eventData.mode === "RESERVATION" &&
      eventData.openAt &&
      eventData.breaktime &&
      eventData.limit
    ) {
      await this.reservationSettingRepository.createReservationSetting({
        eventId,
        openAt: new Date(eventData.openAt),
        breaktime: eventData.breaktime,
        limit: eventData.limit,
      });
    }

    return {
      success: true,
      eventId,
      mainImage: mainImageUrl,
      detailImage: detailImages,
    };
  }
}
