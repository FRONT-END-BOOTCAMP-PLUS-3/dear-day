"use client";

import TwoTab from "@/components/Tab/TwoTab/TwoTab";

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Tab({ activeTab, setActiveTab }: TabProps) {
  const tabList: [string, string] = ["리스트로 보기", "지도로 보기"];

  return (
    <div>
      <TwoTab
        options={tabList}
        selectedTab={activeTab}
        onChange={setActiveTab}
      />
    </div>
  );
}
