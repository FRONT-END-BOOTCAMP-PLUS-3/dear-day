"use client";

import Icon from "@/components/Icon/Icon";
import styles from "./CourseMakingButton.module.scss";

const CourseMakingButton = () => {
  return (
    <button className={styles.courseMakingButton}>
      <Icon id="create-course" />
      <p>코스 만들기</p>
    </button>
  );
};

export default CourseMakingButton;
