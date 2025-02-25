import HeartButton from "@/components/Button/HeartButton/HeartButton";
import styles from "./TitleContents.module.scss";
import Icon from "@/components/Icon/Icon";

export default function TitleContents() {
  return (
    <div className={styles.titleBox}>
      <div>
        <h1>{"생카 제목"}</h1>
        <HeartButton eventId={0} />
      </div>
      <div>
        <Icon id="x-logo" />
        <p>{"트위터 아이디"}</p>
      </div>
      <div>
        <Icon id="calendar" />
        <p>{"날짜"}</p>
      </div>
      <div>
        <Icon id="map" />
        <p>{"주소"}</p>
      </div>
      <div>
        <Icon id="profile" />
        <p>{"생카 주인공"}</p>
      </div>
    </div>
  );
}
