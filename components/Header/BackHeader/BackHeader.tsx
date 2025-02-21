"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/Icon/Icon";
import style from "./BackHeader.module.scss";

const BackHeader = ({ title }: { title: string }) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (window.history.length > 1) {
      router.back(); // 이전 페이지가 있으면 뒤로가기
    } else {
      router.push("/"); // 이전 페이지가 없으면 홈으로 이동
    }
  };

  return (
    <header className={style.backHeader}>
      <div className={style.icons} onClick={handleBackClick}>
        <Icon id="arrow-left" />
      </div>
      <h1 className={style.title}>{title}</h1>
    </header>
  );
};

export default BackHeader;
