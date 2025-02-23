"use client";

import React from "react";
import Image from "next/image";
import styles from "./CourseEdit.module.scss";
import Icon from "../Icon/Icon";

interface CourseEditProps {
  star: string;
  title: string;
  eventImage: string;
  startDate: string;
  endDate: string;
  order: number;
  isEditing: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export default function CourseEdit({
  star,
  title,
  eventImage,
  startDate,
  endDate,
  order,
  isEditing = false,
  onDragStart,
  onDragOver,
  onDrop,
}: CourseEditProps) {
  return (
    <div className={styles.container}>
      <div className={styles.order}>{order}</div>
      <div
        className={styles.cardContainer}
        draggable={isEditing}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Image
          className={styles.eventImage}
          src={eventImage}
          alt="Event"
          width={50}
          height={70}
        />
        <div className={styles.info}>
          <span className={styles.star}>{star}</span>
          <div className={styles.title}>{title}</div>
          <div className={styles.date}>
            {startDate} ~ {endDate}
          </div>
        </div>
        <div
          className={styles.iconWrapper}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {isEditing && <Icon id="hamburger" />}
        </div>
      </div>
    </div>
  );
}
