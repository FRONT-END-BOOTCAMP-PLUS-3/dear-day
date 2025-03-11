import BackHeader from "@/components/Header/BackHeader/BackHeader";
import styles from "./page.module.scss";
import Icon from "@/components/Icon/Icon";

const Page = () => {
  return (
    <div className={styles.homeContainer}>
      <BackHeader title={"내 정보"} />
      <div className={styles.item}>
        <p>알림 설정하기</p>
        <Icon id="arrow-right" />
      </div>
      <div className={styles.item}>
        <p>로그아웃</p>
        <Icon id="arrow-right" />
      </div>
      <div className={styles.item}>
        <p>탈퇴하기</p>
        <Icon id="arrow-right" />
      </div>
    </div>
  );
};

export default Page;
