import { CheckReservationAvailabilityDto } from "@/application/usecases/event/dto/CheckReservationAvailabilityDto";
import { Reservation } from "./types";

export const transformReservations = (
  data: CheckReservationAvailabilityDto
): Reservation[] => {
  const reservationMap = new Map<string, Map<string, number>>();

  data.reservationConfirmedAt.forEach((reservationConfirmedAt) => {
    const dateObj = new Date(reservationConfirmedAt);

    // ✅ UTC 시간을 KST(한국 시간, UTC+9)로 변환
    const kstDateObj = new Date(dateObj.getTime() + 9 * 60 * 60 * 1000);

    const date = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
    }).format(kstDateObj);
    const time = `${String(kstDateObj.getHours()).padStart(2, "0")}:${String(
      kstDateObj.getMinutes()
    ).padStart(2, "0")}`;

    if (!reservationMap.has(date)) {
      reservationMap.set(date, new Map());
    }
    const timeMap = reservationMap.get(date)!;
    timeMap.set(time, (timeMap.get(time) || 0) + 1);
  });

  return Array.from(reservationMap.entries()).map(([date, times]) => ({
    date,
    times: Array.from(times.entries()).map(([time, count]) => ({
      time,
      count,
    })),
  }));
};

export const generateDateList = (startDate: Date, endDate: Date): string[] => {
  const dates: string[] = [];

  const start = new Date(startDate);
  const end = new Date(endDate);

  // 날짜 부분만 추출하기 위해 연, 월, 일을 가져옴
  const startDateOnly = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const endDateOnly = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );

  const current = new Date(startDateOnly); // 기존 날짜를 변경하지 않도록 복사

  while (current <= endDateOnly) {
    dates.push(
      current.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      })
    );

    current.setDate(current.getDate() + 1);
  }

  return dates;
};

export const generateHourlyList = (
  startTime: string,
  endTime: string
): string[] => {
  const start = parseInt(startTime.split(":")[0], 10);
  const end = parseInt(endTime.split(":")[0], 10);
  const startMinute = parseInt(startTime.split(":")[1], 10);
  const timeList: string[] = [];

  for (let i = start; i <= end; i++) {
    timeList.push(
      `${String(i).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}`
    );
  }

  return timeList;
};
