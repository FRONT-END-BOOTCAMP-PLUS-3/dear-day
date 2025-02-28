import { useState, useEffect } from "react";
import { transformReservations, generateHourlyList } from "./utils";
import { Reservation, ReservationData } from "./types";

// 예약 관련 데모데이터
const mockReservations: ReservationData[] = [
  { reservationConfirmedAt: "2025-03-01T10:00:00" },
  { reservationConfirmedAt: "2025-03-01T10:00:00" },
  { reservationConfirmedAt: "2025-03-01T10:00:00" },
  { reservationConfirmedAt: "2025-03-01T11:00:00" },
  { reservationConfirmedAt: "2025-03-01T11:00:00" },
  { reservationConfirmedAt: "2025-03-01T11:00:00" },
  { reservationConfirmedAt: "2025-03-01T12:00:00" },
  { reservationConfirmedAt: "2025-03-01T12:00:00" },
  { reservationConfirmedAt: "2025-03-01T12:00:00" },
  { reservationConfirmedAt: "2025-03-02T11:00:00" },
  { reservationConfirmedAt: "2025-03-02T11:00:00" },
  { reservationConfirmedAt: "2025-03-02T11:00:00" },
];

const useReservations = (
  eventId?: number,
  limit?: number,
  startTime?: string,
  endTime?: string,
  selectedDate?: string | null
) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // eventId를 보내서 예약 목록 받아오기 (추후 API추가 예정)
  useEffect(() => {
    if (eventId && limit) {
      const transformedData = transformReservations(mockReservations);
      setReservations(transformedData);
    } else {
      setReservations([]);
    }
  }, [eventId, limit]);

  const selectedDateReservations =
    reservations.find((r) => r.date === selectedDate)?.times || [];

  const disabledTimes =
    eventId && limit
      ? generateHourlyList(startTime!, endTime!).filter((time) =>
          selectedDateReservations.some(
            (t) => t.time === time && t.count >= limit
          )
        )
      : [];

  const disabledDates =
    eventId && limit
      ? reservations
          .filter((r) =>
            generateHourlyList(startTime!, endTime!).every((time) =>
              r.times.some((t) => t.time === time && t.count >= limit)
            )
          )
          .map((r) => r.date)
      : [];

  return { disabledDates, disabledTimes };
};

export default useReservations;
