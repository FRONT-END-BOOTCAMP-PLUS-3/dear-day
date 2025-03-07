"use client";

import { ReservationTicketDto } from "@/application/usecases/ticket/dto/ReservationTicketDto";
import { WaitingTicketDto } from "@/application/usecases/ticket/dto/WaitingTicketDto";
import { useEffect, useState } from "react";

interface TicketProps {
  eventId: number;
  isOpen: boolean;
  onClose: () => void;
}

const Ticket = ({ eventId, isOpen, onClose }: TicketProps) => {
  const [date, setData] = useState<ReservationTicketDto | WaitingTicketDto>();

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await fetch(`/api/ticket?eventId=${eventId}`);
        if (!response.ok) throw new Error("Failed to fetch ticket data");

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTicketData();
  }, [eventId]);
  return <div></div>;
};

export default Ticket;

// import React from "react";
// import styles from "./TicketModal.module.scss";
// import Icon from "../Icon/Icon";

// type TicketModalProps =
//   | {
//       variant: "isReservation"; // 예약 티켓
//       title: string;
//       imageUrl: string;
//       userId: string;
//       date: string;
//       time: Date;
//       breakTime: number;
//       onClick: () => void;
//       isOpen: boolean;
//     }
//   | {
//       variant: "isWaiting"; // 대기 티켓
//       title: string;
//       imageUrl: string;
//       userId: string;
//       headcount: number;
//       waitingNumber: number;
//       waitingTotal: number;
//       waitingAhead: number;
//       onClick: () => void;
//       isOpen: boolean;
//     };

// const TicketModal = (props: TicketModalProps) => {
//   if (!props.isOpen) return null;
//   // 시간 포맷 변환 함수
//   const formatTime = (date: Date) => {
//     const h = date.getHours().toString().padStart(2, "0");
//     const m = date.getMinutes().toString().padStart(2, "0");
//     return `${h}:${m}`;
//   };

//   // 종료 시간 계산 (예약 티켓인 경우)
//   let startTimeStr = "";
//   let endTimeStr = "";
//   if (props.variant === "isReservation") {
//     const startTime = new Date(props.time);
//     const endTime = new Date(startTime);
//     endTime.setMinutes(startTime.getMinutes() + 60 - props.breakTime);

//     startTimeStr = formatTime(startTime);
//     endTimeStr = formatTime(endTime);
//   }
//   return (
//     <div className={styles.modalContainer}>
//       <div className={styles.ticketModal}>
//         <div className={styles.modalContent}>
//           <div className={styles.ticketHeader}>
//             <img
//               src={props.imageUrl}
//               alt="Ticket Thumbnail"
//               className={styles.thumbnail}
//             />
//             <div className={styles.text}>
//               <h2>{props.title}</h2>
//               <p className={styles.location}>
//                 <Icon id="map" /> 자세한 장소
//               </p>
//             </div>
//             <button
//               type="button"
//               onClick={props.onClick}
//               className={styles.closeButton}
//             >
//               <Icon id="close" />
//             </button>
//           </div>

//           {/* 예약 티켓 */}
//           {props.variant === "isReservation" && (
//             <>
//               <div className={styles.ticketBody}>
//                 <p>
//                   <strong>예약자 아이디:</strong> {props.userId}
//                 </p>
//                 <p>
//                   <strong>예약 날짜:</strong> {props.date}
//                 </p>
//                 <p>
//                   <strong>예약 시간:</strong> {props.time.toDateString()}
//                 </p>
//               </div>

//               <div className={styles.ticketNotice}>
//                 예약한 시간대 (
//                 <strong>
//                   {startTimeStr} ~ {endTimeStr}
//                 </strong>
//                 ) 내에 자유롭게 입장 및 퇴장이 가능합니다
//               </div>

//               <div className={styles.ticketFooter}>
//                 <div className={styles.circleIcon}>✔️</div>
//                 <p>예약이 확정되었습니다</p>
//               </div>
//             </>
//           )}

//           {/* 대기 티켓 */}
//           {props.variant === "isWaiting" && (
//             <>
//               <div className={styles.ticketBody}>
//                 <p>
//                   <strong>예약자 아이디:</strong> {props.userId}
//                 </p>
//                 <p>
//                   <strong>예약 인원:</strong> {props.headcount}명
//                 </p>
//               </div>

//               <div className={styles.ticketNotice}>
//                 대기는 본인명의 아이디로 최대 4인까지 가능하며,
//                 <br /> 예상 소요시간을 알 수 없으며, 입장 전에 알림을 보낼
//                 예정입니다.
//               </div>

//               <div className={styles.ticketWaitingInfo}>
//                 <p>
//                   현재 대기 <strong>{props.waitingTotal}팀</strong>
//                 </p>
//                 <p>
//                   내 앞에 <strong>{props.waitingAhead}팀</strong>
//                 </p>
//                 <p className={styles.waitingNumber}>
//                   대기 번호 <strong>{props.waitingNumber} 번</strong>
//                 </p>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketModal;
