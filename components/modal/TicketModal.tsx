"use client";

import { useEffect, useState } from "react";
import styles from "./TicketModal.module.scss";
import Icon from "../Icon/Icon";
import Notice from "./_components/Notice";
import Image from "next/image";
import useToggle from "@/hooks/useToggle";
import Modal from "./Modal";
import { createPortal } from "react-dom";

type TicketModalProps = {
  eventId: number;
  isOpen: boolean;
  onClose: () => void;
  onTicketCancel?: () => void;
};

type TicketData = {
  mode: "RESERVATION" | "WAITING";
  eventId: number;
  userId: string;
  title: string;
  address: string;
  email: string;
  mainImage: string;
  reservationConfirmedAt?: string;
  breaktime?: number;
  waitingNumber?: number;
  headCount?: number;
  waitingAhead?: number;
};

const TicketModal = ({
  eventId,
  isOpen,
  onClose,
  onTicketCancel,
}: TicketModalProps) => {
  const [data, setData] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReservationModalOpen, toggleReservationModal] = useToggle(false);
  const [isWaitingModalOpen, toggleWaitingModal] = useToggle(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!isOpen || !eventId) return;

    const fetchTicketData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/ticket?eventId=${eventId}`);
        if (!response.ok) throw new Error("Failed to fetch ticket data");

        const result: TicketData = await response.json();
        setData(result);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("🚨 :", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTicketData();
  }, [eventId, isOpen]);

  const handleConfirm = (mode: "RESERVATION" | "WAITING") => async () => {
    if (!eventId) return alert("이벤트 정보가 없습니다.");

    try {
      const response = await fetch(
        `/api/ticket?eventId=${eventId}&mode=${mode}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel the ticket");
      }
      onClose();
      onTicketCancel?.();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("🚨 :", error);
      }
      alert("취소에 실패했습니다.");
    }
  };

  if (!isOpen) return null;
  if (loading) return null;
  if (!data) return <p>티켓 정보를 찾을 수 없습니다.</p>;

  const modalContent = (
    <div className={styles.modalContainer}>
      <div className={styles.ticketModal}>
        <div className={styles.modalContent}>
          <div className={styles.ticketHeader}>
            <div className={styles.imageContainer}>
              <Image
                src={data.mainImage}
                alt="Ticket Thumbnail"
                width={200}
                height={0}
                objectFit="cover"
                className={styles.thumbnail}
              />
            </div>
            <div className={styles.text}>
              <h2 className={styles.title}>{data.title}</h2>
              <p className={styles.location}>
                <Icon id="map" size={16} /> {data.address}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={styles.closeButton}
            >
              <Icon id="close" />
            </button>
          </div>

          {data.mode === "RESERVATION" && (
            <>
              <div className={styles.infoContainer}>
                <div className={styles.info}>
                  <p>예약자 아이디 : </p>
                  <p>예약 날짜 :</p>
                  <p>예약 시간 :</p>
                </div>
                <div className={styles.info}>
                  <p>{data.email}</p>
                  <p>
                    {new Date(
                      data.reservationConfirmedAt || ""
                    ).toLocaleDateString()}
                  </p>
                  <p>
                    {new Date(
                      data.reservationConfirmedAt || ""
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <div className={styles.ticketNotice}>
                {data.breaktime !== undefined && (
                  <Notice
                    breaktime={data.breaktime}
                    startTime={`${String(new Date(data.reservationConfirmedAt || "").getHours()).padStart(2, "0")}:${String(new Date(data.reservationConfirmedAt || "").getMinutes()).padStart(2, "0")}`}
                  />
                )}
              </div>
              <div className={styles.ticketFooter}>
                <div className={styles.circleIcon}>
                  <Icon id="check" size={57} />
                </div>
                <h2>
                  <strong>예약</strong>이 <strong>확정</strong>되었습니다
                </h2>
              </div>
            </>
          )}

          {data.mode === "WAITING" && (
            <>
              <div className={styles.waitingInfoContainer}>
                <div className={styles.waitingInfo}>
                  <p>대기자 아이디 :</p>
                  <p>대기 인원 :</p>
                </div>
                <div className={styles.waitingInfo}>
                  <p>{data.email}</p>
                  <p>{data.headCount}명</p>
                </div>
              </div>
              <div className={styles.waitingNotice}>
                <ul>
                  <li>
                    예상 소요 시간은 알 수 없으며 앞에 5팀이 남으면 푸쉬 알림을
                    보내드립니다
                  </li>
                  <li>
                    호출 시 현장에 안계실 경우 웨이팅이 취소될 수 있습니다
                  </li>
                </ul>
              </div>
              <div className={styles.waitingFooter}>
                {data.waitingAhead === 0 ? (
                  <div className={styles.floatingText}>
                    <h2>지금 바로 입장하세요 !</h2>
                  </div>
                ) : (
                  <>
                    <p>
                      내 앞에{" "}
                      <span className={styles.waitingNumber}>
                        <strong>{data.waitingAhead}</strong>
                      </span>{" "}
                      팀
                    </p>
                    <h1>
                      대기 번호{" "}
                      <span className={styles.waitingNumber}>
                        <strong>{data.waitingNumber}</strong>
                      </span>{" "}
                      번
                    </h1>
                  </>
                )}
              </div>
            </>
          )}
        </div>
        {data.mode === "RESERVATION" && (
          <button className={styles.cancel} onClick={toggleReservationModal}>
            예약 취소
          </button>
        )}
        {data.mode === "WAITING" && (
          <button className={styles.cancel} onClick={toggleWaitingModal}>
            대기 취소
          </button>
        )}
      </div>
      <Modal
        contents={[{ type: "textOnly", title: "예약을 취소하시겠습니까?" }]}
        confirmText={"완료"}
        cancelText={"취소"}
        onConfirm={handleConfirm("RESERVATION")}
        onCancel={toggleReservationModal}
        isOpen={isReservationModalOpen}
      />

      <Modal
        contents={[{ type: "textOnly", title: "대기를 취소하시겠습니까?" }]}
        confirmText={"완료"}
        cancelText={"취소"}
        onConfirm={handleConfirm("WAITING")}
        onCancel={toggleWaitingModal}
        isOpen={isWaitingModalOpen}
      />
    </div>
  );
  // 모달을 `document.body`에 추가하여 부모 요소의 영향에서 벗어나게 함
  return mounted ? createPortal(modalContent, document.body) : null;
};

export default TicketModal;
