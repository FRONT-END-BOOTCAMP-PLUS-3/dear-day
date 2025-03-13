"use client";

import DateTimeSelectButton from "@/components/Button/DateTimeSelectButton/DateTimeSelectButton";
import EventInfo from "./EventInfo/EventInfo";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import ReservationWaitList from "./ReservationWaitList/ReservationWaitList";
import { useParams } from "next/navigation";
import { showWaitingListDto } from "@/application/usecases/manage/dto/ShowWaitingListDto";
import { showReservationListDto } from "@/application/usecases/manage/dto/ShowReservationListDto";

const ManagePage = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [event, setEvent] = useState<
    showReservationListDto | showWaitingListDto | null
  >(null);

  const params = useParams();
  const eventId = params.event_id;

  useEffect(() => {
    const fetchParticipantList = async () => {
      try {
        const response = await fetch(
          `/api/manage/show-manage-event?eventId=${eventId}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("예약자 명단을 불러오는 데 실패했습니다.");
        }

        const data = await response.json();
        setEvent(data.results);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("🚨 예약자 명단 조회 실패:", error);
        }
        setEvent(null);
      }
    };
    fetchParticipantList();
  }, [eventId]);

  if (!event) {
    return <div>이벤트 정보를 불러오는 중...</div>;
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const selectedReservationDate = new Date(selectedDate + "T" + selectedTime);
  const filteredReservationList = (
    event as showReservationListDto
  ).reservationList?.filter((reservation) => {
    const reservationDate = new Date(reservation.confirmedAt);

    return reservationDate.getTime() === selectedReservationDate.getTime();
  });

  const handleReservationConfirm = async (id: number) => {
    try {
      const response = await fetch("/api/manage/update-reservation-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservationId: id, status: "ENTERED" }),
      });

      if (!response.ok) {
        throw new Error("예약 상태 변경 실패");
      }

      setEvent((prev) => {
        if (!prev) return prev;

        const updatedReservationList = (
          prev as showReservationListDto
        ).reservationList?.map((reservation) =>
          reservation.id === id
            ? { ...reservation, status: "ENTERED" }
            : reservation
        );

        return {
          ...prev,
          reservationList: updatedReservationList,
        } as showReservationListDto;
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 예약 상태 변경 실패:", error);
      }
    }
  };

  const handleWaitingConfirm = async (id: number) => {
    try {
      const response = await fetch("/api/manage/update-waiting-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ waitingId: id, status: "ENTERED" }),
      });

      if (!response.ok) {
        throw new Error("대기 상태 변경 실패");
      }

      setEvent((prev) => {
        if (!prev) return prev;

        const updatedWaitingList = (
          prev as showWaitingListDto
        ).waitingList?.map((waiting) =>
          waiting.id === id ? { ...waiting, status: "ENTERED" } : waiting
        );

        return {
          ...prev,
          waitingList: updatedWaitingList,
        } as showWaitingListDto;
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 예약 상태 변경 실패:", error);
      }
    }
  };

  return (
    <div className={styles.homeContainer}>
      <EventInfo
        title={event?.title ?? "이벤트 정보 없음"}
        imgSrc={event?.mainImg ?? ""}
        address={event?.address ?? ""}
        startDate={new Date(event?.startDate) ?? new Date("0000-00-00")}
        endDate={new Date(event?.endDate) ?? new Date("0000-00-00")}
        mode={event?.mode ?? "RESERVATION"}
      />

      <h3 className={styles.listTitle}>
        {event?.mode === "RESERVATION" ? "예약자 명단" : "웨이팅 명단"}
      </h3>
      <div>
        {event?.mode === "RESERVATION" ? (
          <DateTimeSelectButton
            startDate={event.startDate ?? new Date("0000-00-00")}
            endDate={event.endDate ?? new Date("0000-00-00")}
            startTime={
              event?.mode === "RESERVATION"
                ? ((event as showReservationListDto).startTime ?? "00:00")
                : "00:00"
            }
            endTime={
              event?.mode === "RESERVATION"
                ? ((event as showReservationListDto).endTime ?? "00:00")
                : "00:00"
            }
            onSelectDate={handleDateSelect}
            onSelectTime={handleTimeSelect}
          />
        ) : (
          <> </>
        )}
        <ul className={styles.reservationListContianer}>
          {event?.mode === "RESERVATION" ? (
            filteredReservationList.length > 0 ? (
              filteredReservationList.map((reservation, index) => (
                <ReservationWaitList
                  key={reservation.id}
                  id={reservation.id}
                  index={index + 1}
                  userId={reservation.userId}
                  name={reservation.name}
                  email={reservation.email}
                  createdAt={new Date(reservation.confirmedAt)}
                  status={reservation.status}
                  onStatus={handleReservationConfirm}
                />
              ))
            ) : (
              <p className={styles.noReservation}>예약자가 없습니다.</p>
            )
          ) : (event as showWaitingListDto).waitingList.length > 0 ? (
            (event as showWaitingListDto).waitingList.map((waitting, index) => (
              <ReservationWaitList
                key={waitting.id}
                id={waitting.id}
                index={index}
                userId={waitting.userId}
                name={waitting.name}
                headCount={waitting.headCount}
                email={waitting.email}
                createdAt={new Date(waitting.confirmedAt)}
                status={waitting.status}
                onStatus={handleWaitingConfirm}
              />
            ))
          ) : (
            <p className={styles.noReservation}>예약자가 없습니다.</p>
          )}
        </ul>
      </div>

      {/* <div>
        <ul className={styles.reservationListContianer}></ul>
      </div> */}
    </div>
  );
};

export default ManagePage;
