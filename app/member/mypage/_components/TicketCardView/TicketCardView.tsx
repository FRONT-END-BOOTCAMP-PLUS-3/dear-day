import styles from "./TicketCardView.module.scss";
import Image from "next/image";
import TicketModal from "@/components/modal/TicketModal";
import { useState } from "react";

interface TicketCardViewProps {
  mode: string;
  eventId: number;
  mainImage: string;
  stageName: string;
  title: string;
  address: string;
  waitingNumber?: number;
  waitingAhead?: number;
  reservationConfirmedAt?: string;
}

const TicketCardView: React.FC<
  TicketCardViewProps & { onTicketCancel: () => void }
> = ({
  mode,
  eventId,
  mainImage,
  title,
  stageName,
  address,
  waitingNumber,
  waitingAhead,
  reservationConfirmedAt,
  onTicketCancel,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <li
        className={styles.smallCardView}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <div className={styles.smallCardWrapper}>
          <Image
            className={styles.smallCardImg}
            src={process.env.NEXT_PUBLIC_FRONT_IMG + mainImage}
            alt={title}
            fill
            unoptimized
          />
          {/* mode 값에 따라 다른 UI 렌더링 */}
          {mode === "RESERVATION" ? (
            <div className={styles.smallCardOverlay}>
              <p className={styles.smallCardOverlayText}>
                {new Date(reservationConfirmedAt || "").toLocaleDateString()}
              </p>
              <p>
                {new Date(reservationConfirmedAt || "").toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ) : mode === "WAITING" ? (
            <div className={styles.smallCardOverlay}>
              <p className={styles.smallCardOverlayText}>
                대기번호 {waitingNumber}
              </p>
              {waitingAhead !== undefined && (
                <p className={styles.smallCardOverlayText}>
                  앞에 {waitingAhead}명 대기 중
                </p>
              )}
            </div>
          ) : null}
        </div>
        <div className={styles.smallCardContent}>
          <h3 className={styles.smallCardTitle}>{title}</h3>
        </div>
        <p className={styles.smallCardText}>
          {stageName} · {address}
        </p>
      </li>
      {isModalOpen && (
        <TicketModal
          eventId={eventId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTicketCancel={onTicketCancel}
        />
      )}
    </>
  );
};

export default TicketCardView;
