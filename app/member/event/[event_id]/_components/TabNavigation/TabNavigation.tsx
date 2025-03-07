"use client";

import FourTab from "@/components/Tab/FourTab/FourTab";

interface TabNavigationProps {
  mode: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabNavigation({
  mode,
  activeTab,
  setActiveTab,
}: TabNavigationProps) {
  const tabOptions =
    mode === "RESERVATION"
      ? ["상세", "특전", "위치", "예약"]
      : ["상세", "특전", "위치", "대기"];

  return (
    <FourTab
      options={tabOptions}
      selectedTab={activeTab}
      onChange={setActiveTab}
    />
  );
}
