"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon/Icon";
import styles from "./MainButton.module.scss";

const MainButtonList = [
  { icon: "list", text: "생카 목록", route: "/member/list" },
  { icon: "course", text: "내 코스", route: "/member/course" },
  { icon: "edit", text: "생카 등록", route: "/member/register_event" },
  { icon: "black-heart", text: "찜 목록", route: "/member/mypage" },
];

const MainButton = () => {
  const [hasManage, setHasManage] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/manage/show-my-event", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답에 문제가 있습니다.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.results.length > 0) {
          setHasManage(true);
        } else {
          setHasManage(false);
        }
      })
      .catch(() => {
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
        <Link href="/member/manage" key="/member/manage">
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
