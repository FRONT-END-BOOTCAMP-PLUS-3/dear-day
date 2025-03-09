"use client"; // ✅ 클라이언트 컴포넌트

import FourTab from "@/components/Tab/FourTab/FourTab";
import { useState } from "react";

interface TabNavigationProps {
  mode: string;
}

export default function ClientTabNavigation({ mode }: TabNavigationProps) {
  const [selectedTab, setSelectedTab] = useState<string>("상세");

  const tabOptions =
    mode === "RESERVATION"
      ? ["상세", "특전", "위치", "예약"]
      : ["상세", "특전", "위치", "대기"];

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <FourTab
      options={tabOptions}
      selectedTab={selectedTab}
      onChange={handleTabChange} // ✅ 이벤트 핸들러 정상 작동
    />
  );
}
