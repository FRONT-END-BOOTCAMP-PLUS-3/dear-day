"use client"; // 클라이언트 컴포넌트

import FourTab from "@/components/Tab/FourTab/FourTab";
import { useState, useEffect } from "react";

interface TabNavigationProps {
  mode: string;
}

export default function ClientTabNavigation({ mode }: TabNavigationProps) {
  const [selectedTab, setSelectedTab] = useState<string>("상세");

  const tabOptions =
    mode === "RESERVATION"
      ? ["상세", "특전", "위치", "예약"]
      : ["상세", "특전", "위치", "대기"];

  // 탭 클릭 시 해당 div로 스크롤 이동하는 함수
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);

    const tabIndex = tabOptions.indexOf(tab);
    const sectionId = `div${tabIndex + 1}`;

    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 📌 **스크롤 감지하여 activeTab 업데이트**
  useEffect(() => {
    const handleScroll = () => {
      let newActiveTab = selectedTab;

      for (let i = 0; i < tabOptions.length; i++) {
        const section = document.getElementById(`div${i + 1}`);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight * 0.3) {
            newActiveTab = tabOptions[i];
            break;
          }
        }
      }

      if (newActiveTab !== selectedTab) {
        setSelectedTab(newActiveTab);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selectedTab, tabOptions]);

  return (
    <FourTab
      options={tabOptions}
      selectedTab={selectedTab}
      onChange={handleTabChange}
    />
  );
}
