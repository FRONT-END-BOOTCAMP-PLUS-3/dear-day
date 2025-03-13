"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import styles from "./CourseDetailListView.module.scss";

interface CourseDetailListViewProps {
  id: number;
  eventId: number;
  index: number;
  title: string;
  eventImage: string;
  startDate: Date | string;
  endDate: Date | string;
  starName: string;
  isEditMode: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const safeDateToISOString = (date: Date | string): string => {
  const d = date instanceof Date ? date : new Date(date);
  return !isNaN(d.getTime()) ? d.toISOString() : "";
};

const formatShortDate = (date: Date | string): string => {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return "Invalid Date";
  const year = d.getFullYear().toString();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const CourseDetailListView: React.FC<CourseDetailListViewProps> = ({
  eventId,
  index,
  title,
  eventImage,
  startDate,
  endDate,
  starName,
  isEditMode,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <div className={styles.courseDetailContainer}>
      <div className={styles.courseDetailIndex}>{index}</div>
      <Link
        href={`/member/event/${eventId}`}
        className={styles.courseDetailView}
      >
        <>
          <Image
            className={styles.courseDetailImg}
            src={process.env.NEXT_PUBLIC_FRONT_SRC + eventImage}
            alt={title}
            width={56}
            height={56}
          />
          <div className={styles.courseDetailContent}>
            <div className={styles.courseDetailText}>
              <div className={styles.courseDetailHeader}>
                <p className={styles.courseDetailStarName}>{starName}</p>
                <h3 className={styles.courseDetailTitle}>{title}</h3>
              </div>
              <p className={styles.courseDetailTime}>
                <time dateTime={safeDateToISOString(startDate)}>
                  {formatShortDate(startDate)}
                </time>
                &nbsp;~&nbsp;
                <time dateTime={safeDateToISOString(endDate)}>
                  {formatShortDate(endDate)}
                </time>
              </p>
            </div>
            {isEditMode && (
              <div
                className={styles.courseDetailMoveIcon}
                onDragStart={isEditMode ? onDragStart : undefined}
                onDragOver={isEditMode ? onDragOver : undefined}
                onDrop={isEditMode ? onDrop : undefined}
              >
                <Icon id="hamburger" />
              </div>
            )}
          </div>
        </>
      </Link>
    </div>
  );
};

export default CourseDetailListView;
