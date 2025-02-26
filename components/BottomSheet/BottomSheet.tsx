"use client";

import styles from "./BottomSheet.module.scss";
import React, { useState, useEffect, useRef } from "react";

type SheetState = "closed" | "min" | "middle" | "open";

interface BottomSheetProps {
  children?: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ children }) => {
  const [sheetState, setSheetState] = useState<SheetState>("min");
  const sheetRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);
  const [startHeight, setStartHeight] = useState<number>(0);
  const [dragHeight, setDragHeight] = useState<number | null>(null);

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

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setDragging(true);
    setStartY(clientY);
    const currentHeight = sheetRef.current?.getBoundingClientRect().height || 0;
    setStartHeight(currentHeight);
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!dragging || startY === null) return;
    const clientY =
      "touches" in e
        ? (e as TouchEvent).touches[0].clientY
        : (e as MouseEvent).clientY;
    const delta = startY - clientY;
    const newHeight = Math.max(40, startHeight + delta);
    setDragHeight(newHeight);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent) => {
    if (!dragging || startY === null) return;
    const clientY =
      "changedTouches" in e
        ? (e as TouchEvent).changedTouches[0].clientY
        : (e as MouseEvent).clientY;
    const delta = startY - clientY;
    const newHeight = Math.max(40, startHeight + delta);

    const H = window.innerHeight;
    const closedHeight = 40;
    const minHeight = H * 0.4;
    const middleHeight = H * 0.7;
    const openHeight = H * 0.92;

    const diffClosed = Math.abs(newHeight - closedHeight);
    const diffMin = Math.abs(newHeight - minHeight);
    const diffMiddle = Math.abs(newHeight - middleHeight);
    const diffOpen = Math.abs(newHeight - openHeight);

    let finalState: SheetState = "min";
    const minDiff = Math.min(diffClosed, diffMin, diffMiddle, diffOpen);
    if (minDiff === diffClosed) {
      finalState = "closed";
    } else if (minDiff === diffMin) {
      finalState = "min";
    } else if (minDiff === diffMiddle) {
      finalState = "middle";
    } else if (minDiff === diffOpen) {
      finalState = "open";
    }
    setSheetState(finalState);
    setDragging(false);
    setStartY(null);
    setDragHeight(null);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchmove", handleDragMove);
      document.addEventListener("touchend", handleDragEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [dragging, startY, startHeight]);

  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  let heightValue = "";
  switch (sheetState) {
    case "open":
      heightValue = windowHeight ? `${windowHeight * 0.92}px` : "92%";
      break;
    case "middle":
      heightValue = windowHeight ? `${windowHeight * 0.7}px` : "70%";
      break;
    case "min":
      heightValue = windowHeight ? `${windowHeight * 0.4}px` : "40%";
      break;
    case "closed":
      heightValue = "40px";
      break;
    default:
      heightValue = windowHeight ? `${windowHeight * 0.4}px` : "40%";
  }
  const appliedHeight = dragHeight !== null ? `${dragHeight}px` : heightValue;

  return (
    <div className={styles.bottomSheetContainer}>
      <div
        ref={sheetRef}
        className={styles.bottomSheet}
        style={{ height: appliedHeight }}
        onClick={handleContainerClick}
      >
        <div
          className={styles.dragHandle}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div className={styles.handleBar}></div>
        </div>
        {(sheetState === "min" ||
          sheetState === "middle" ||
          sheetState === "open") && (
          <div className={styles.content}>{children}</div>
        )}
      </div>
    </div>
  );
};

export default BottomSheet;
