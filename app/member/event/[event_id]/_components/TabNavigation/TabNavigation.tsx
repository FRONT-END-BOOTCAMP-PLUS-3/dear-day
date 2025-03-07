"use client";

import FourTab from "@/components/Tab/FourTab/FourTab";

interface TabNavigationProps {
  mode: string;
  activeTab: string; // ✅ 부모에서 직접 상태를 관리하도록 변경
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
      selectedTab={activeTab} // ✅ 부모에서 전달한 `activeTab`을 사용
      onChange={setActiveTab} // ✅ 부모에서 상태를 변경하도록 함
    />
  );
}
