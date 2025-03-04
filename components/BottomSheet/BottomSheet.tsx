"use client";

import styles from "./BottomSheet.module.scss";
import React, { useState, useEffect, useRef } from "react";

type SheetState = "closed" | "middle" | "open";

interface BottomSheetProps {
  children?: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ children }) => {
  const [sheetState, setSheetState] = useState<SheetState>("middle");
  const sheetRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);
  const [startHeight, setStartHeight] = useState<number>(0);
  const [dragHeight, setDragHeight] = useState<number | null>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (sheetState === "middle") {
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

    const H = mounted ? window.innerHeight : 800;
    const closedHeight = 40;
    const middleHeight = H * 0.4;
    const openHeight = H * 0.92;

    const diffClosed = Math.abs(newHeight - closedHeight);
    const diffMiddle = Math.abs(newHeight - middleHeight);
    const diffOpen = Math.abs(newHeight - openHeight);

    let finalState: SheetState = "middle";
    const minDiff = Math.min(diffClosed, diffMiddle, diffOpen);
    if (minDiff === diffClosed) {
      finalState = "closed";
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
  }, [dragging, startY, startHeight, mounted]);

  const handleDragHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (sheetState === "closed") {
      setSheetState("middle");
    } else if (sheetState === "middle") {
      setSheetState("closed");
    } else if (sheetState === "open") {
      setSheetState("middle");
    }
  };

  const windowHeight = mounted ? window.innerHeight : 800;
  let heightValue = "";
  switch (sheetState) {
    case "open":
      heightValue = `${windowHeight * 0.92}px`;
      break;
    case "middle":
      heightValue = `${windowHeight * 0.4}px`;
      break;
    case "closed":
      heightValue = "40px";
      break;
    default:
      heightValue = `${windowHeight * 0.4}px`;
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
          onClick={handleDragHandleClick}
        >
          <div className={styles.handleBar}></div>
        </div>
        {(sheetState === "middle" || sheetState === "open") && (
          <div className={styles.content}>{children}</div>
        )}
      </div>
    </div>
  );
};

export default BottomSheet;
