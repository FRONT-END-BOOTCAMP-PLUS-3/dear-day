import styles from "./RegisterEvent.module.scss";

const RegisterEventStep2 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.eventType}></div>
      <div className={styles.reservationStartEndTime}></div>
      <div className={styles.reservationOpen}></div>
      <div className={styles.breaktime}></div>
      <div className={styles.timeLimit}></div>
    </div>
  );
};

export default RegisterEventStep2;
