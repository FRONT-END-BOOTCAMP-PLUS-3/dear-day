"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import TitleHeader from "./_components/TitleHeader/TitleHeader";
import DetailSection from "./_components/DetailSection/DetailSection";
import BenefitList from "./_components/BenefitList/BenefitList";
import LocationSection from "./_components/LocationSection/LocationSection";
import ReservationSection from "./_components/ReservationSection/ReservationSection";
import WaitingSection from "./_components/WaitingSection/WaitingSection";
import styles from "./page.module.scss";
import TabNavigation from "./_components/TabNavigation/TabNavigation";
import { ShowEventDetailDto } from "@/application/usecases/event/dto/ShowEventDetailDto";
import { demoEventData } from "./demoData";
import useReservationStore from "@/store/reservationStore";

export default function EventDetail() {
  const params = useParams();
  const router = useRouter();
  const { clearReservation } = useReservationStore();

  const eventId = params?.event_id as string; // eventId를 문자열로 변환

  const [eventData, setEventData] = useState<ShowEventDetailDto>(demoEventData);

  const [activeTab, setActiveTab] = useState<string>("상세");

  useEffect(() => {
    if (!eventId) {
      router.replace("/"); // eventId가 없으면 /로 리디렉트
      return;
    }
    fetch(`/api/event/${eventId}`, {
      method: "GET",
      credentials: "include", // ⭐️ 서버에서 userId가 필요하니까 쿠키를 포함하여 전송 ⭐️
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch event data"); // 응답 실패 처리
        return res.json();
      })
      .then((data: ShowEventDetailDto) => setEventData(data))
      .catch((err) => {
        console.log(err.message);
        setEventData(demoEventData);
      });
    // 페이지가 언마운트될 때 예약 초기화
    return () => {
      clearReservation();
    };
  }, [eventId]);

  return (
    <div className={styles.eventDetailPage}>
      <div className={styles.titleHeader}>
        <TitleHeader eventData={eventData} />
      </div>
      <TabNavigation
        mode={eventData.mode ?? "RESERVATION"}
        setActiveTab={setActiveTab}
      />
      <div>
        <DetailSection eventData={eventData} />
      </div>
      <div className={styles.divider}></div>
      <div>
        <BenefitList benefitList={eventData.benefits ?? []} />
      </div>
      <div className={styles.divider}></div>
      <div>
        <LocationSection eventData={eventData} />
      </div>
      <div className={styles.divider}></div>
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
