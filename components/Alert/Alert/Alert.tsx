"use client";

import React from "react";
import Icon from "../../Icon/Icon";
import styles from "./Alert.module.scss";

interface AlertProps {
  children: React.ReactNode;
  type?: "info" | "waiting" | "reservation";
  onClose: () => void;
}

export default function Alert({
  children,
  type = "info",
  onClose,
}: AlertProps) {
  let typeText;
  switch (type) {
    case "info":
      typeText = "소식 알림 🔔";
      break;
    case "waiting":
      typeText = "대기 알림 ⏳";
      break;
    case "reservation":
      typeText = "예약 알림 🎫";
      break;
  }

  return (
    <div className={styles.alert}>
      <div className={styles.wrapper}>
        <span className={styles.typeText}>{typeText}</span>
        <span>{children}</span>
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        <Icon id="close" />
      </button>
    </div>
  );
}
