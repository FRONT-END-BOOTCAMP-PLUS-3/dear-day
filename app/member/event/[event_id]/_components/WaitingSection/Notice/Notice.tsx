"use client";

import styles from "./Notice.module.scss";

export default function Notice() {
  return (
    <div className={styles.noticeContainer}>
      <h4>이용 안내</h4>
      <div className={styles.notice}>
        <p>대기는 본인 명의의 아이디로 최대 4인까지 가능합니다. </p>
        <p>
          앞에 5팀이 남으면 푸쉬 알림을 보내드리며, 실시간 대기 현황은
          마이페이지 내 예약 현황에서 확인하세요!
        </p>
      </div>
    </div>
  );
}
