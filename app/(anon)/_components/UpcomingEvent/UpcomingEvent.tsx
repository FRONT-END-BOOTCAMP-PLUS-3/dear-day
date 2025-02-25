"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon/Icon";
import LargeCardView from "@/components/EventView/LargeCardView/LargeCardView";
import styles from "./UpcomingEvent.module.scss";

// interface EventData {
//   id: number;
//   imgSrc: string;
//   title: string;
//   startDate: Date;
//   endDate: Date;
//   starName: string;
//   address: string;
// }

const UpcomingEvent = () => {
  const router = useRouter();
  // const [upcomingEvents, setUpcomingEvents] = useState<EventData[]>([]);

  const handleUpcomingEventList = () => {
    router.push(`/list`);
  };

  const upcomingEvents = [
    {
      id: 1,
      imgSrc: "/img/",
      title: "리즈의 생일 카페",
      startDate: new Date(),
      endDate: new Date(),
      starName: "리즈",
      address: "마포구 와우산로 123",
    },
    {
      id: 1,
      imgSrc: "/img/",
      title: "럭키비키자나",
      startDate: new Date(),
      endDate: new Date(),
      starName: "원영",
      address: "마포구 와우산로 234",
    },
    {
      id: 1,
      imgSrc: "/img/",
      title: "In Our Love",
      startDate: new Date(),
      endDate: new Date(),
      starName: "누구",
      address: "마포구 와우산로 345",
    },
    {
      id: 1,
      imgSrc: "/img/",
      title: "원빈은잘생겼다",
      startDate: new Date(),
      endDate: new Date(),
      starName: "원빈",
      address: "마포구 와우산로 1354",
    },
    {
      id: 1,
      imgSrc: "/img/",
      title: "원빈은잘생겼다",
      startDate: new Date(),
      endDate: new Date(),
      starName: "원빈",
      address: "마포구 와우산로 1354",
    },
  ];

  // // const shuffleArray = <T,>(array: T[]): T[] => {
  // //   const newArray = [...array];
  // //   for (let i = newArray.length - 1; i > 0; i--) {
  // //     const j = Math.floor(Math.random() * (i + 1));
  // //     [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  // //   }
  // //   return newArray;
  // // };

  // // useEffect(() => {
  // //   const fetchEvents = async () => {
  // //     try {
  // //       const response = await fetch("/api/list");
  // //       if (!response.ok) {
  // //         throw new Error("네트워크 응답 에러");
  // //       }
  // //       const data: EventData[] = await response.json();
  // //       const shuffled = shuffleArray(data);
  // //       setUpcomingEvents(shuffled);
  // //     } catch (error) {
  // //       console.log(error);
  // //     }
  // //   };

  // //   fetchEvents();
  // // }, []);

  return (
    <div className={styles.upcomingEventContainer}>
      <div className={styles.upcomingEventHeader}>
        <p className={styles.text}>다가오는 생카</p>
        <button className={styles.button} onClick={handleUpcomingEventList}>
          <Icon id="arrow-right" />
        </button>
      </div>
      <div className={styles.cardScroller}>
        {upcomingEvents.map((e) => (
          <LargeCardView key={e.id} {...e} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvent;
