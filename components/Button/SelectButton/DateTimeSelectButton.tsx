"use client";

import styles from "./DateTimeSelectButton.module.scss";

interface DateTimeSelectButtonProps {
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
}

const DateSelectButton: React.FC<DateTimeSelectButtonProps> = ({
  startDate,
  endDate,
  startTime,
  endTime,
  onSelectDate,
  onSelectTime,
}) => {
  const generateDateList = (startDate: Date, endDate: Date): string[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates: string[] = [];

    const formatDate = (date: Date): string => {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
      }).format(date);
    };

    while (start <= end) {
      dates.push(formatDate(new Date(start))); // 변환된 날짜 추가
      start.setDate(start.getDate() + 1); // 하루 증가
    }

    return dates;
  };

  const generateHourlyList = (startTime: Date, endTime: Date) => {
    const start = new Date(startTime).getHours(); // 시작 시간 (정수)
    const end = new Date(endTime).getHours(); // 끝 시간 (정수)

    const timeList = [];
    if (start < end) {
      // 같은 날 내에서 시간이 증가하는 경우 (예: 10:00 ~ 14:00)
      for (let i = start; i < end; i++) {
        timeList.push(`${String(i).padStart(2, "0")}:00`);
      }
    } else {
      // 밤부터 다음 날 새벽까지 (예: 22:00 ~ 02:00)
      for (let i = start; i < 24; i++) {
        timeList.push(`${String(i).padStart(2, "0")}:00`);
      }
      for (let i = 0; i < end; i++) {
        timeList.push(`${String(i).padStart(2, "0")}:00`);
      }
    }

    return timeList;
  };

  const dates = generateDateList(startDate, endDate);
  const times = generateHourlyList(startTime, endTime);

  return (
    <form method="POST" action="/submit" className={styles.dateTimeSelectForm}>
      <fieldset className={styles.dateTimeSelectContainer}>
        <legend className={styles.dateTimeSelectTitle}>날짜</legend>
        <div className={styles.dateTimeSelectWrapper}>
          {dates.map((date) => (
            <label key={date} className={styles.dateTimeSelectLabel}>
              <input
                type="radio"
                name="selectedDate"
                value={date}
                onChange={() => onSelectDate(date)}
                className={styles.dateTimeSelectInput}
              />
              <span>{date}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.dateTimeSelectContainer}>
        <legend className={styles.dateTimeSelectTitle}>시간</legend>
        <div className={styles.dateTimeSelectWrapper}>
          {times.map((time) => (
            <label key={time} className={styles.dateTimeSelectLabel}>
              <input
                type="radio"
                name="selectedTime"
                value={time}
                onChange={() => onSelectTime(time)}
                className={styles.dateTimeSelectInput}
              />
              <span>{time}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </form>
  );
};

export default DateSelectButton;
