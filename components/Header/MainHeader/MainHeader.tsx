"use client";

import Icon from "@/components/Icon/Icon";
import style from "./MainHeader.module.scss";
import Link from "next/link";
import Image from "next/image";

const MainHeader = () => {
  return (
    <header className={style.mainHeader}>
      <Link href="/" className={style.logoLink}>
        <Image
          src="/img/header-logo.png"
          alt="헤더 로고"
          className={style.logo}
          width={120}
          height={50}
        />
      </Link>
      <div className={style.icons}>
        {/* <Link href="/notice" className={style.icon}>
          <Icon id="notification" />
        </Link> */}
        <Link href="/member/mypage" className={style.icon}>
          <Icon id="profile" />
        </Link>
      </div>
    </header>
  );
};

export default MainHeader;
