import SwipeCardContainer from "@/components/CardContainer/SwipeCardContainer";
import styles from "@/app/member/mypage/page.module.scss";
import TicketCardView from "../TicketCardView/TicketCardView";
import { useEffect, useState } from "react";
import { ReservationCardViewDto } from "@/application/usecases/mypage/dto/ReservationCardViewDto";
import { WaitingCardViewDto } from "@/application/usecases/mypage/dto/WaitingCardViewDto";
import SmallCardView from "@/components/EventView/SmallCardView/SmallCardView";
import ScrollCardContainer from "@/components/CardContainer/ScrollCardContainer";
import { VisitedEventDto } from "@/application/usecases/mypage/dto/VisitedEventDto";
import EmptyText from "../EmptyText/EmptyText";

const ReservationWaiting = () => {
  const [reservationTicketData, setReservationTicketData] = useState<
    ReservationCardViewDto[]
  >([]);
  const [waitingTicketData, setWaitingTicketData] = useState<
    WaitingCardViewDto[]
  >([]);
  const [visitedEventData, setVisitedEventData] = useState<VisitedEventDto[]>(
    []
  );

  const fetchReservationCardView = async () => {
    try {
      const response = await fetch("/api/mypage/reservation-cardview", {
        method: "GET",
      });

      if (!response.ok)
        throw new Error("Failed to fetch reservation card view");

      const data = await response.json();
      setReservationTicketData(data);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 :", error);
      }
    }
  };
  const fetchWaitingCardView = async () => {
    try {
      const response = await fetch("/api/mypage/waiting-cardview", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to fetch waiting card view");

      const data = await response.json();
      setWaitingTicketData(data);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 :", error);
      }
    }
  };
  const fetchVisitedEvent = async () => {
    try {
      const response = await fetch("/api/mypage/visited-event", {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to fetch visited event");

      const data = await response.json();
      setVisitedEventData(data);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 :", error);
      }
    }
  };

  useEffect(() => {
    fetchReservationCardView();
    fetchWaitingCardView();
    fetchVisitedEvent();
  }, []);

  return (
    <div className={styles.tabContent}>
      <p className={styles.title}>진행중인 예약</p>
      {reservationTicketData.length > 0 ? (
        <SwipeCardContainer>
          {reservationTicketData.map((card) => (
            <TicketCardView
              mode={"RESERVATION"}
              key={card.eventId}
              eventId={card.eventId}
              mainImage={card.mainImage}
              title={card.title}
              stageName={card.stageName}
              address={card.address}
              reservationConfirmedAt={card.reservationConfirmedAt}
              onTicketCancel={() => {
                fetchReservationCardView();
              }}
            />
          ))}
        </SwipeCardContainer>
      ) : (
        <EmptyText container="Reservation" />
      )}
      <p className={styles.title}>진행중인 대기</p>
      {waitingTicketData.length > 0 ? (
        <SwipeCardContainer>
          {waitingTicketData.map((card) => (
            <TicketCardView
              mode={"WAITING"}
              key={card.eventId}
              eventId={card.eventId}
              mainImage={card.mainImage}
              title={card.title}
              stageName={card.stageName}
              address={card.address}
              waitingAhead={card.waitingAhead}
              waitingNumber={card.waitingNumber}
              onTicketCancel={() => {
                fetchWaitingCardView();
              }}
            />
          ))}
        </SwipeCardContainer>
      ) : (
        <EmptyText container="Waiting" />
      )}
      <p className={styles.title}>다녀온 생카</p>
      {visitedEventData.length > 0 ? (
        <ScrollCardContainer variant="grid">
          {visitedEventData.map((card) => (
            <SmallCardView
              key={card.eventId}
              id={card.eventId}
              imgSrc={card.mainImage}
              title={card.title}
              starName={card.stageName}
              address={card.address}
            />
          ))}
        </ScrollCardContainer>
      ) : (
        <EmptyText container="VisitedEvent" />
      )}
    </div>
  );
};

export default ReservationWaiting;
