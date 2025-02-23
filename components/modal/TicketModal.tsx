import React from "react";
import styles from "./TicketModal.module.scss";
import Icon from "../Icon/Icon";

type TicketModalProps =
  | {
      variant: "isReservation"; // 예약 티켓
      title: string;
      imageUrl: string;
      userId: string;
      date: string;
      time: string;
      onClick: () => void;
      isOpen: boolean;
    }
  | {
      variant: "isWaiting"; // 대기 티켓
      title: string;
      imageUrl: string;
      userId: string;
      headcount: number;
      waitingNumber: number;
      waitingTotal: number;
      waitingAhead: number;
      onClick: () => void;
      isOpen: boolean;
    };

const TicketModal = (props: TicketModalProps) => {
  if (!props.isOpen) return null;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.ticketModal}>
        <div className={styles.modalContent}>
          <div className={styles.ticketHeader}>
            <img
              src={props.imageUrl}
              alt="Ticket Thumbnail"
              className={styles.thumbnail}
            />
            <div className={styles.text}>
              <h2>{props.title}</h2>
              <p className={styles.location}>
                <Icon id="map" /> 자세한 장소
              </p>
            </div>
            <button
              type="button"
              onClick={props.onClick}
              className={styles.closeButton}
            >
              <Icon id="close" />
            </button>
          </div>

          {/* 예약 티켓 */}
          {props.variant === "isReservation" && (
            <>
              <div className={styles.ticketBody}>
                <p>
                  <strong>예약자 아이디:</strong> {props.userId}
                </p>
                <p>
                  <strong>예약 날짜:</strong> {props.date}
                </p>
                <p>
                  <strong>예약 시간:</strong> {props.time}
                </p>
              </div>

              <div className={styles.ticketNotice}>
                예약은 본인명의 아이디로만 가능하며, 예약 날짜 및 시간은 변경이
                불가능합니다.
              </div>

              <div className={styles.ticketFooter}>
                <div className={styles.circleIcon}>✔️</div>
                <p>예약이 확정되었습니다</p>
              </div>
            </>
          )}

          {/* 대기 티켓 */}
          {props.variant === "isWaiting" && (
            <>
              <div className={styles.ticketBody}>
                <p>
                  <strong>예약자 아이디:</strong> {props.userId}
                </p>
                <p>
                  <strong>예약 인원:</strong> {props.headcount}명
                </p>
              </div>

              <div className={styles.ticketNotice}>
                대기는 본인명의 아이디로 최대 4인까지 가능하며,
                <br /> 예상 소요시간을 알 수 없으며, 입장 전에 알림을 보낼
                예정입니다.
              </div>

              <div className={styles.ticketWaitingInfo}>
                <p>
                  현재 대기 <strong>{props.waitingTotal}팀</strong>
                </p>
                <p>
                  내 앞에 <strong>{props.waitingAhead}팀</strong>
                </p>
                <p className={styles.waitingNumber}>
                  대기 번호 <strong>{props.waitingNumber} 번</strong>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
