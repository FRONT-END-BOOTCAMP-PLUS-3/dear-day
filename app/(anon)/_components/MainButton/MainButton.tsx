"use client";

import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import styles from "./MainButton.module.scss";

const MainButtonList = [
  { icon: "list", text: "생카 목록", route: "/list" },
  { icon: "course", text: "내 코스", route: "/login" },
  { icon: "edit", text: "생카 등록", route: "/login" },
  { icon: "black-heart", text: "찜 목록", route: "/login" },
];

const MainButton = () => {
  return (
    <div className={styles.buttonListContainer}>
      {MainButtonList.map((e) => (
        <Link href={e.route} key={e.route}>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>
              <Icon id={e.icon} />
            </button>
          </div>
          <p className={styles.buttonCategory}>{e.text}</p>
        </Link>
      ))}
    </div>
  );
};

export default MainButton;
