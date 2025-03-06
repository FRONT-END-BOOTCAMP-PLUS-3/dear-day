"use client";

import ListView from "@/components/EventView/ListView/ListView";
import styles from "./page.module.scss";

const MemberSearchResultPage = () => {
  return (
    <div className={styles.homeContainer}>
      {events ? (
        <ul>
          {events.map((event) => (
            <ListView
              key={event.id}
              id={event.id}
              imgSrc={event.imgSrc}
              title={event.title}
              startDate={event.startDate}
              endDate={event.endDate}
              starName={event.starName}
              address={event.address}
            />
          ))}
        </ul>
      ) : (
        <div className={styles.noResult}>
          <p>검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MemberSearchResultPage;
