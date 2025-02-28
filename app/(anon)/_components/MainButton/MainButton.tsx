"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon/Icon";
import styles from "./MainButton.module.scss";

const MainButtonList = [
  { icon: "list", text: "생카 목록", route: "/list" },
  { icon: "course", text: "내 코스", route: "/course" },
  { icon: "edit", text: "생카 등록", route: "/register_event" },
  { icon: "black-heart", text: "찜 목록", route: "/mypage" },
];

const MainButton = () => {
  const [hasManage, setHasManage] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/manage")
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답에 문제가 있습니다.");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setHasManage(data.length > 0);
        } else {
          setHasManage(false);
        }
      })
      .catch((error) => {
        console.error("에러 발생:", error);
        setHasManage(false);
      });
  }, []);

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
      {hasManage && (
        <Link href="/route" key="/route">
          <div className={styles.buttonContainer}>
            <button className={styles.button}>
              <Icon id="setting" />
            </button>
          </div>
          <p className={styles.buttonCategory}>생카 관리</p>
        </Link>
      )}
    </div>
  );
};

export default MainButton;
