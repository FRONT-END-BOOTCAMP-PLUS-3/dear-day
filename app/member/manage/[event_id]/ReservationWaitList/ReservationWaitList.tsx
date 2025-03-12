import styles from "./ReservationWaitList.module.scss";

interface ReservationWaitListProps {
  id: number;
  index: number;
  userId: string;
  name: string;
  headCount?: number;
  email: string;
  createdAt: Date;
  status: string;
  onStatus: (id: number, userId: string) => void;
}

const ReservationWaitList: React.FC<ReservationWaitListProps> = ({
  id,
  index,
  userId,
  name,
  headCount,
  email,
  createdAt,
  status,
  onStatus,
}) => {
  const formatShortDate = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <li className={styles.reservationWaitItem}>
      <p className={styles.reservationWaitItemIndex}>{index + 1}</p>
      <div className={styles.reservationWaitItemContent}>
        <p>{headCount ? `${name} (${headCount}명)` : name}</p>
        <p>{email}</p>
        <p>
          <time dateTime={createdAt.toISOString()}>
            {formatShortDate(createdAt)}
          </time>
        </p>
      </div>
      {status === "ENTERED" ? (
        <p className={styles.enteredText}>입장완료</p>
      ) : (
        <button
          className={styles.enterButton}
          onClick={() => onStatus(id, userId)}
        >
          입장시키기
        </button>
      )}
    </li>
  );
};

export default ReservationWaitList;
