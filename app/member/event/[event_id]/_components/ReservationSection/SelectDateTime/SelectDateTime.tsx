"use client";

import DateSelectButton from "@/components/Button/DateTimeSelectButton/DateTimeSelectButton";
import { ShowEventDetailDto } from "@/application/usecases/event/dto/ShowEventDetailDto";
import useReservationStore from "@/store/reservationStore"; // Zustand 스토어 가져오기

interface Props {
  eventData: ShowEventDetailDto;
}

export default function SelectDateTime({ eventData }: Props) {
  const { date, time, setReservation, clearReservation } =
    useReservationStore();

  const handleDateSelect = (selectedDate: string) => {
    if (date !== selectedDate) {
      clearReservation(); // 날짜가 변경되면 기존 데이터 삭제
    }
    setReservation(selectedDate, time || ""); // 새로운 날짜 저장 (시간 유지)
  };

  const handleTimeSelect = (selectedTime: string) => {
    setReservation(date || "", selectedTime); // 새로운 시간 저장 (날짜 유지)
  };

  return (
    <div>
      <DateSelectButton
        eventId={eventData.id}
        limit={eventData.limit}
        startDate={eventData.startDate}
        endDate={eventData.endDate}
        startTime={eventData.startTime}
        endTime={eventData.endTime}
        onSelectDate={handleDateSelect} // Zustand 상태 업데이트
        onSelectTime={handleTimeSelect} // Zustand 상태 업데이트
      />
    </div>
  );
}
