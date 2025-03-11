"use client";

import DateTimeSelectButton from "@/components/Button/DateTimeSelectButton/DateTimeSelectButton";
import EventInfo from "./EventInfo/EventInfo";
import styles from "./page.module.scss";
// import { useState } from "react";
// import ReservationWaitList from "./ReservationWaitList/ReservationWaitList";

const managePage = () => {
  // const [selectedDate, setSelectedDate] = useState<string>("");
  // const [selectedTime, setSelectedTime] = useState<string>("");

  const handleDateSelect = (date: string) => {
    // setSelectedDate(date);
    console.log("선택한 날짜:", date);
  };

  const handleTimeSelect = (time: string) => {
    // setSelectedTime(time);
    console.log("선택한 시간:", time);
  };

  // const handleConfirm = (id: string) => {
  //   const confirmTime = new Date().toISOString();
  //   console.log("입장완료:", id, confirmTime);
  // };

  return (
    <div className={styles.homeContainer}>
      <EventInfo
        title="스타 팬미팅"
        imgSrc="/poster.png"
        address="서울 강남구 스타카페"
        startDate={new Date("2024-04-15")}
        endDate={new Date("2024-04-16")}
        mode="RESERVATION"
      />

      <h3 className={styles.listTitle}>예약자 명단</h3>
      <div>
        <DateTimeSelectButton
          startDate={new Date("2024-06-01")}
          endDate={new Date("2024-06-02")}
          startTime="14:40"
          endTime="18:40"
          onSelectDate={handleDateSelect}
          onSelectTime={handleTimeSelect}
        />
        <ul className={styles.reservationListContianer}>
          {/* {reservations.map((reservation, index) => (
            <ReservationWaitList
              key={reservation.id}
              id={reservation.id}
              index={index + 1}
              name={reservation.name}
              email={reservation.email}
              createdAt={reservation.reservationConfirmedAt}
              status={reservation.status}
              onConfirm={handleConfirm}
            />
          ))} */}
        </ul>
      </div>

      <div>
        <ul className={styles.reservationListContianer}>
          {/* {waittingList.map((waitting, index) => (
            <ReservationWaitList
              key={waitting.id}
              id={waitting.id}
              index={index}
              name={waitting.name}
              headCount={waitting.headCount}
              email={waitting.email}
              createdAt={waitting.waitingcreatedAt}
              status={waitting.status}
              onConfirm={handleConfirm}
            />
          ))} */}
        </ul>
      </div>
    </div>
  );
};

export default managePage;
