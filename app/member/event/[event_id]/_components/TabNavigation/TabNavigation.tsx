"use client";

import FourTab from "@/components/Tab/FourTab/FourTab";
import { useState } from "react";

interface TabNavigationProps {
  mode: "RESERVATION" | "WAITING";
  setActiveTab: (tab: string) => void;
}

export default function TabNavigation({
  mode,
  setActiveTab,
}: TabNavigationProps) {
  const [selectedTab, setSelectedTab] = useState<string>("상세");

  const tabOptions =
    mode === "RESERVATION"
      ? ["상세", "특전", "위치", "예약"]
      : ["상세", "특전", "위치", "대기"];

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab); // ✅ 내부 상태 업데이트
    setActiveTab(tab); // ✅ 부모로 탭 변경 전달
  };
  return (
    <>
      <FourTab
        options={tabOptions}
        selectedTab={selectedTab}
        onChange={handleTabChange}
      />
    </>
  );
}
