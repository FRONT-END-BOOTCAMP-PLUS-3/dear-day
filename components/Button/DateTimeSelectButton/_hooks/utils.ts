import { ReservationData, Reservation } from "./types";

export const transformReservations = (
  data: ReservationData[]
): Reservation[] => {
  const reservationMap = new Map<string, Map<string, number>>();

  data.forEach(({ reservationConfirmedAt }) => {
    const dateObj = new Date(reservationConfirmedAt);
    const date = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
    }).format(dateObj);
    const time = `${String(dateObj.getHours()).padStart(2, "0")}:${String(
      dateObj.getMinutes()
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
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: string[] = [];

  while (start <= end) {
    dates.push(
      new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
      }).format(new Date(start))
    );
    start.setDate(start.getDate() + 1);
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
