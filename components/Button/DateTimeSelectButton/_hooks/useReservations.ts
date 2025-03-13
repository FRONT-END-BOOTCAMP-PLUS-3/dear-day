import { useState, useEffect } from "react";
import { transformReservations, generateHourlyList } from "./utils";
import { Reservation } from "./types";
import { CheckReservationAvailabilityDto } from "@/application/usecases/event/dto/CheckReservationAvailabilityDto";

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
    const fetchReservations = async () => {
      if (!eventId || !limit) {
        setReservations([]);
        return;
      }

      try {
        const response = await fetch(`/api/event/reservation`, {
          method: "POST", // POST 요청으로 변경
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 쿠키 포함 요청
          body: JSON.stringify({ eventId }), // body에 eventId 포함
        });
        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }

        // 데이터 변환 후 상태 저장
        const data: CheckReservationAvailabilityDto = await response.json();
        const transformedData = transformReservations(data);
        setReservations(transformedData);
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("🚨 :", err);
        }
        setReservations([]);
      }
    };

    fetchReservations();
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
