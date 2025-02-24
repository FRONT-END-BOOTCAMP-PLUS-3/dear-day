import styles from "./DateSelectButton.module.scss";

const DateSelectButton = () => {
  const dates = [
    "Feb 26",
    "Feb 27",
    "Feb 28",
    "Feb 29",
    "Feb 30",
    "Feb 13",
    "Feb 23",
    "Feb 45",
  ];

  return (
    <form method="POST" action="/submit">
      <fieldset className={styles.dateSelectContainer}>
        <legend className={styles.dateSelectLabel}>날짜</legend>
        <div className={styles.dateSelectWrapper}>
          {dates.map((date, index) => (
            <label key={date} className={styles.dateSelectInput}>
              <input
                type="radio"
                name="selectedDate"
                value={date}
                defaultChecked={index === 0}
              />
              <span>{date}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </form>
  );
};

export default DateSelectButton;
