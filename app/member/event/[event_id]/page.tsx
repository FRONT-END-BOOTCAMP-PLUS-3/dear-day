"use client";

import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { EventData, demoEventData } from "./eventData"; // 데모 데이터 가져오기
import FourTab from "@/components/Tab/FourTab/FourTab";
import TitleHeader from "./_components/TitleHeader/TitleHeader";
import DetailSection from "./_components/DetailSection/DetailSection";
import BenefitList from "./_components/BenefitList/BenefitList";
import LocationSection from "./_components/LocationSection/LocationSection";
import ReservationSection from "./_components/ReservationSection/ReservationSection";
import WaitingSection from "./_components/WaitingSection/WaitingSection";
import styles from "./page.module.scss";

export default function EventDetail() {
  const params = useParams();
  const eventId = params?.event_id as string; // eventId를 문자열로 변환

  // 🔽 API 호출 대신 데모 데이터 직접 사용
  const [eventData, setEventData] = useState<EventData>(demoEventData);

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

  // 탭 변경 시 해당 섹션으로 스크롤 이동
  const detailRef = useRef<HTMLDivElement | null>(null);
  const benefitRef = useRef<HTMLDivElement | null>(null);
  const locationRef = useRef<HTMLDivElement | null>(null);
  const reservAndWaitRef = useRef<HTMLDivElement | null>(null);

  const handleTabChange = (tab: string) => {
    const sectionRefs: Record<
      string,
      React.RefObject<HTMLDivElement | null>
    > = {
      상세: detailRef,
      특전: benefitRef,
      위치: locationRef,
      예약: reservAndWaitRef,
    };

    const targetRef = sectionRefs[tab];

    if (targetRef?.current) {
      const yOffset =
        targetRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.eventDetailPage}>
      <div className={styles.titleHeader}>
        <TitleHeader eventData={eventData} />
      </div>
      <FourTab
        options={["상세", "특전", "위치", "예약"]}
        selectedTab={"상세"}
        onChange={handleTabChange}
      />
      <div ref={detailRef}>
        <DetailSection eventData={eventData} />
      </div>
      <div ref={benefitRef}>
        <BenefitList eventData={eventData} />
      </div>
      <div ref={locationRef}>
        <LocationSection eventData={eventData} />
      </div>
      <div ref={reservAndWaitRef}>
        {eventData.mode === "RESERVATION" ? (
          <ReservationSection eventData={eventData} />
        ) : (
          <WaitingSection eventData={eventData} />
        )}
      </div>
    </div>
  );
}
