"use client";

import Icon from "@/components/Icon/Icon";
import style from "./MainHeader.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const MainHeader = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      router.push("/member/mypage");
    } else {
      router.push("/login");
    }
  };
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
        <button className={style.icon} onClick={handleProfileClick}>
          <Icon id="profile" />
        </button>
      </div>
    </header>
  );
};

export default MainHeader;
