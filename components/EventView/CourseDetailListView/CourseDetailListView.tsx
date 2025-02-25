"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon/Icon";
import styles from "./CourseDetailListView.module.scss";

interface CourseDetailListViewProps {
  id: number;
  index: number;
  title: string;
  eventImage: string;
  startDate: Date;
  endDate: Date;
  starName: string;
  isEditMode: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const CourseDetailListView: React.FC<CourseDetailListViewProps> = ({
  id,
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
  const formatShortDate = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <div className={styles.courseDetailContainer}>
      <div className={styles.courseDetailIndex}>{index}</div>
      <Link href={`/course/${id}`} className={styles.courseDetailView}>
        <>
          <Image
            className={styles.courseDetailImg}
            src={eventImage}
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
                <time dateTime={startDate.toISOString()}>
                  {formatShortDate(startDate)}
                </time>
                &nbsp;~&nbsp;
                <time dateTime={endDate.toISOString()}>
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
