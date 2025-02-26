"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { EventData, demoEventData } from "./eventData";
import TitleHeader from "./_components/TitleHeader/TitleHeader";
import DetailSection from "./_components/DetailSection/DetailSection";
import BenefitList from "./_components/BenefitList/BenefitList";
import LocationSection from "./_components/LocationSection/LocationSection";
import ReservationSection from "./_components/ReservationSection/ReservationSection";
import WaitingSection from "./_components/WaitingSection/WaitingSection";
import styles from "./page.module.scss";
import TabNavigation from "./_components/TabNavigation/TabNavigation";

export default function EventDetail() {
  const params = useParams();
  const eventId = params?.event_id as string; // eventId를 문자열로 변환

  const [eventData, setEventData] = useState<EventData>(demoEventData);

  const [activeTab, setActiveTab] = useState<string>("상세");

  useEffect(() => {
    console.log("eventId:", eventId); // 콘솔에서 eventId 확인
    // 🔽 API 요청 주석 처리
    // if (!eventId) return;
    // fetch(`/api/event/${eventId}`)
    //   .then((res) => res.json())
    //   .then((data: EventData) => setEventData(data))
    //   .catch((err) => {
    //     console.error("Error fetching event data:", err);
    //     setEventData(demoEventData); // 오류 발생 시 데모 데이터 사용
    //   });
  }, [eventId]);

  return (
    <div className={styles.eventDetailPage}>
      <div className={styles.titleHeader}>
        <TitleHeader eventData={eventData} />
      </div>
      <TabNavigation mode={eventData.mode} setActiveTab={setActiveTab} />
      <div>
        <DetailSection eventData={eventData} />
      </div>
      <div>
        <BenefitList eventData={eventData} />
      </div>
      <div>
        <LocationSection eventData={eventData} />
      </div>
      <div>
        {eventData.mode === "RESERVATION" ? (
          <ReservationSection eventData={eventData} />
        ) : (
          <WaitingSection eventData={eventData} />
        )}
      </div>
    </div>
  );
}
