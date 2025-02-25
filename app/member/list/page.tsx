"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import Tab from "./_components/Tab/Tab";
import ListView from "./_components/ListView/ListView";
import MapView from "./_components/MapView/MapView";

export default function ListPage() {
  const [activeTab, setActiveTab] = useState("리스트로 보기");

  return (
    <div className={styles.listContainer}>
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "리스트로 보기" ? <ListView /> : <MapView />}
    </div>
  );
}
