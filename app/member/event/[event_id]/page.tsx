"use client";

import { useState, useEffect, useRef } from "react";
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

  const containerRef = useRef<HTMLDivElement | null>(null);

  const tabList =
    eventData.mode == "RESERVATION"
      ? ["상세", "특전", "위치", "예약"]
      : ["상세", "특전", "위치", "대기"];

  // 📌 스크롤 시 activeTab 변경
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollPosition = window.scrollY + 100; // 약간의 여유값 추가
      let newActiveTab = activeTab;

      tabList.forEach((tab, index) => {
        const section = document.getElementById((index + 1).toString());
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            newActiveTab = tab;
          }
        }
      });

      if (newActiveTab !== activeTab) {
        setActiveTab(newActiveTab);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeTab, tabList]);

  // 📌 activeTab 변경 시 해당 섹션으로 스크롤 이동
  useEffect(() => {
    const divId = tabList.indexOf(activeTab) + 1;
    const section = document.getElementById(divId.toString());

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeTab]);

  useEffect(() => {
    if (!eventId) {
      router.replace("/"); // eventId가 없으면 /로 리디렉트
      return;
    }

    const queryParams = new URLSearchParams({
      eventId: eventId.toString(),
    }).toString();

    fetch(`/api/event?${queryParams}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch event data");
        return res.json();
      })
      .then((data: ShowEventDetailDto) => setEventData(data))
      .catch((err) => {
        console.log(err.message);
        setEventData(demoEventData);
      });

    return () => {
      clearReservation();
    };
  }, [eventId]);

  return (
    <div ref={containerRef} className={styles.eventDetailPage}>
      <div className={styles.titleHeader}>
        <TitleHeader eventData={eventData} />
      </div>
      <TabNavigation
        mode={eventData.mode ?? "RESERVATION"}
        setActiveTab={setActiveTab}
        activeTab={activeTab} // 현재 활성화된 탭을 전달
      />
      <div id="1">
        <DetailSection eventData={eventData} />
      </div>
      <div className={styles.divider}></div>
      <div id="2">
        <BenefitList benefitList={eventData.benefits ?? []} />
      </div>
      <div className={styles.divider}></div>
      <div id="3">
        <LocationSection eventData={eventData} />
      </div>
      <div className={styles.divider}></div>
      <div id="4">
        {eventData.mode === "RESERVATION" ? (
          <ReservationSection eventData={eventData} />
        ) : (
          <WaitingSection eventData={eventData} />
        )}
      </div>
    </div>
  );
}
