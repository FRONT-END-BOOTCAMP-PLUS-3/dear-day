"use client";

import Icon from "@/components/Icon/Icon";
import style from "./DetailHeader.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DetailHeader = () => {
  const router = useRouter();

  const handleBackClick = () => {
    if (window.history.length > 1) {
      router.back(); // 이전 페이지가 있으면 뒤로가기
    } else {
      router.push("/"); // 이전 페이지가 없으면 홈으로 이동
    }
  };
  return (
    <header className={style.detailHeader}>
      <div className={style.icons} onClick={handleBackClick}>
        <Icon id="arrow-left" />
      </div>
      <Link href="/" className={style.logoLink}>
        <Image
          src="/img/header-logo.png"
          alt="헤더 로고"
          className={style.logo}
          width={120}
          height={50}
        />
      </Link>
    </header>
  );
};

export default DetailHeader;
