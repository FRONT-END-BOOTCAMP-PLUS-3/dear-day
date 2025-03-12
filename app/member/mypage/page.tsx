"use client";
import Profile from "./_components/Profile/Profile";
import Tab from "./_components/Tab/Tab";
import Wishlist from "./_components/Wishlist/Wishlist";
import styles from "./page.module.scss";
import ReservationWaiting from "./_components/ReservationWaiting/ReservationWaiting";
import { useEffect, useState } from "react";
import { UserInfoDto } from "@/application/usecases/mypage/dto/UserInfoDto";
import TwoTab from "@/components/Tab/TwoTab/TwoTab";

const Page = () => {
  const [userInfo, setUserInfo] = useState<UserInfoDto>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/mypage/user-info", {
          method: "GET",
        });
        if (!response.ok) throw new Error("Failed to fetch user info");
        const data: UserInfoDto = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Profile
        username={userInfo?.username || ""}
        email={userInfo?.email || ""}
      />
      <div className={styles.tabContainer}>
        <Tab
          tabs={[
            { label: "찜", content: <Wishlist /> },
            { label: "예약/대기", content: <ReservationWaiting /> },
          ]}
        />
      </div>
    </div>
  );
};

export default Page;
