"use client";

import Link from "next/link";
import styles from "./MainButton.module.scss";
import Icon from "@/components/Icon/Icon";

const MainButtonList = [
  { icon: "list", text: "생카 목록", route: "/list" },
  { icon: "course", text: "내 코스", route: "/course" },
  { icon: "edit", text: "생카 등록", route: "/register_event" },
  { icon: "black-heart", text: "찜 목록", route: "/mypage" },
];

const MainButton = () => {
  return (
    <div className={styles.ButtonListContainer}>
      {MainButtonList.map((e) => (
        <Link href={`${e.route}`} key={e.route}>
          <div className={styles.ButtonContainer}>
            <button className={styles.Button}>
              <Icon id={`${e.icon}`} />
            </button>
          </div>
          <p className={styles.ButtonCategory}>{e.text}</p>
        </Link>
      ))}
    </div>
  );
};

export default MainButton;
