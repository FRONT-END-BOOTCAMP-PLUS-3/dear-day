import TitleHeader from "../../../member/event/[event_id]/_components/TitleHeader/TitleHeader";
import DetailSection from "../../../member/event/[event_id]/_components/DetailSection/DetailSection";
import BenefitList from "../../../member/event/[event_id]/_components/BenefitList/BenefitList";
import LocationSection from "../../../member/event/[event_id]/_components/LocationSection/LocationSection";
import styles from "../../../member/event/[event_id]/page.module.scss";
import { ShowEventDetailDto } from "@/application/usecases/event/dto/ShowEventDetailDto";
import { demoEventData } from "../../../member/event/[event_id]/demoData";
import ClientButton from "./_components/ClientButton";
import ClientTabNavigation from "./_components/ClientTabNavigation";

// 서버에서 데이터를 가져오는 함수
async function getEventData(
  eventId: string
): Promise<ShowEventDetailDto | null> {
  if (!eventId) return null;

  try {
    const queryParams = new URLSearchParams({ eventId }).toString();

    console.log("queryParams", queryParams);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/event?${queryParams}`,
      {
        method: "GET",
        credentials: "include", // 서버에서도 인증 필요
        cache: "no-store", // 최신 데이터 가져오기
      }
    );

    if (!res.ok) throw new Error("Failed to fetch event data");
    return await res.json();
  } catch (error) {
    console.error("Error fetching event data:", error);
    return null;
  }
}

// SSR 적용된 EventDetail 컴포넌트
export default async function EventDetail({
  params,
}: {
  params: { event_id: string };
}) {
  const eventId = await params.event_id; // `await`으로 비동기 처리
  let eventData = await getEventData(eventId);

  if (!eventData) {
    eventData = demoEventData;
  }
  return (
    <div className={styles.eventDetailPage}>
      <div className={styles.titleHeader}>
        <TitleHeader eventData={eventData} />
      </div>
      <ClientTabNavigation mode={eventData.mode ?? "RESERVATION"} />{" "}
      {/* 클라이언트 컴포넌트로 변경 */}
      <div id="div1" className={styles.sectionDiv}>
        <DetailSection eventData={eventData} />
      </div>
      <div className={styles.divider}></div>
      <div id="div2">
        <BenefitList benefitList={eventData.benefits ?? []} />
      </div>
      <div className={styles.divider}></div>
      <div id="div3">
        <LocationSection eventData={eventData} />
      </div>
      <div className={styles.divider}></div>
      <div id="div4">
        {eventData.mode == "RESERVATION" ? <h3>예약</h3> : <h3>대기</h3>}
        로그인 후 이용할 수 있는 서비스입니다.
        <ClientButton /> {/* 클라이언트 컴포넌트로 변경 */}
      </div>
    </div>
  );
}
