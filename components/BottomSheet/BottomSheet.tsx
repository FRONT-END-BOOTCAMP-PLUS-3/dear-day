"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./BottomSheet.module.scss";

type SheetState = "closed" | "min" | "middle" | "open";

interface BottomSheetProps {
  children?: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ children }) => {
  const [sheetState, setSheetState] = useState<SheetState>("min");
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sheetState !== "closed") {
      const handleOutsideClick = (e: MouseEvent) => {
        if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
          setSheetState("closed");
        }
      };
      document.addEventListener("click", handleOutsideClick);
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [sheetState]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (sheetState === "min" || sheetState === "middle") {
      setSheetState("open");
    }
  };

  // 닫힘 → min, min ↔ middle, open → min
  const handleDragHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (sheetState === "closed") {
      setSheetState("min");
    } else if (sheetState === "min") {
      setSheetState("middle");
    } else if (sheetState === "middle") {
      setSheetState("min");
    } else if (sheetState === "open") {
      setSheetState("min");
    }
  };

  let transformStyle = "";
  switch (sheetState) {
    case "open":
      transformStyle = "translateY(8%)";
      break;
    case "min":
      transformStyle = "translateY(60%)";
      break;
    case "middle":
      transformStyle = "translateY(30%)";
      break;
    case "closed":
      transformStyle = "translateY(calc(100% - 40px))";
      break;
    default:
      transformStyle = "translateY(60%)";
  }

  return (
    <div
      ref={sheetRef}
      className={styles.bottomSheet}
      style={{ transform: transformStyle }}
      onClick={handleContainerClick}
    >
      <div className={styles.dragHandle} onClick={handleDragHandleClick}>
        <div className={styles.handleBar}></div>
      </div>
      {(sheetState === "min" ||
        sheetState === "middle" ||
        sheetState === "open") && (
        <div className={styles.content}>{children}</div>
      )}
    </div>
  );
};

export default BottomSheet;
