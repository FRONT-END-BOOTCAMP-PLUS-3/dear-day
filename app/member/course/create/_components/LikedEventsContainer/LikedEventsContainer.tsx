"use client";

import React from "react";
import ScrollCardContainer from "@/components/CardContainer/ScrollCardContainer";
import LargeCardView from "@/components/EventView/LargeCardView/LargeCardView";
import styles from "./LikedEventsContainer.module.scss";
import EmptyText from "../EmptyText/EmptyText";

export interface CourseEventProps {
  id: number;
  mainImage: string;
  title: string;
  startDate: Date;
  endDate: Date;
  starName: string;
  address: string;
}

interface LikedEventsContainerProps {
  likedEvents: CourseEventProps[];
  selectedEvents: number[];
  onSelectionChange: (selected: number[]) => void;
}

const LikedEventsContainer: React.FC<LikedEventsContainerProps> = ({
  likedEvents,
  selectedEvents,
  onSelectionChange,
}) => {
  const handleToggleEvent = (e: React.MouseEvent, event: CourseEventProps) => {
    e.stopPropagation();
    let updated: number[];
    if (selectedEvents.includes(event.id)) {
      updated = selectedEvents.filter((id) => id !== event.id);
    } else {
      updated = [...selectedEvents, event.id];
    }
    onSelectionChange(updated);
  };

  if (!likedEvents || likedEvents.length === 0) {
    return <EmptyText />;
  }

  return (
    <ScrollCardContainer variant="grid">
      {likedEvents.map((event) => (
        <div
          key={event.id}
          onClick={(e) => handleToggleEvent(e, event)}
          className={
            selectedEvents.includes(event.id)
              ? `${styles.cardWrapper} ${styles.selected}`
              : styles.cardWrapper
          }
        >
          <LargeCardView {...event} readOnly={true} />
        </div>
      ))}
    </ScrollCardContainer>
  );
};

export default LikedEventsContainer;
