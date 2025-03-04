"use client";

import React, { useState, useEffect, useRef } from "react";
import CourseDetailListView from "@/components/EventView/CourseDetailListView/CourseDetailListView";
import { Event } from "@prisma/client";

interface DraggableEventListProps {
  isEditMode: boolean;
  initialEventDetails: Event[];
  onFinalizeOrder: (finalOrder: number[]) => void;
}

const DraggableEventList = ({
  isEditMode,
  initialEventDetails,
  onFinalizeOrder,
}: DraggableEventListProps) => {
  const [localEventDetails, setLocalEventDetails] =
    useState<Event[]>(initialEventDetails);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const prevEditModeRef = useRef(isEditMode);

  useEffect(() => {
    setLocalEventDetails(initialEventDetails);
  }, [initialEventDetails]);

  useEffect(() => {
    if (prevEditModeRef.current && !isEditMode) {
      onFinalizeOrder(localEventDetails.map((event) => event.id));
    }
    prevEditModeRef.current = isEditMode;
  }, [isEditMode, localEventDetails, onFinalizeOrder]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    if (!isEditMode) return;
    setDraggingIndex(index);
    if (e.dataTransfer) {
      const target = e.target as HTMLElement;
      const ghostNode = target.cloneNode(true) as HTMLElement;
      ghostNode.style.width = `${target.offsetWidth}px`;
      ghostNode.style.height = `${target.offsetHeight}px`;
      ghostNode.style.opacity = "0.5";
      ghostNode.style.position = "absolute";
      ghostNode.style.top = "-999px";
      ghostNode.style.left = "-500px";
      document.body.appendChild(ghostNode);
      e.dataTransfer.setDragImage(
        ghostNode,
        ghostNode.offsetWidth / 2,
        ghostNode.offsetHeight / 2
      );
      setTimeout(() => document.body.removeChild(ghostNode), 0);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isEditMode) return;
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (!isEditMode) return;
    if (draggingIndex === null || draggingIndex === index) return;
    const newDetails = [...localEventDetails];
    const [draggedItem] = newDetails.splice(draggingIndex, 1);
    newDetails.splice(index, 0, draggedItem);
    setLocalEventDetails(newDetails);
    setDraggingIndex(null);
  };

  const handleDragEnd = () => {
    if (!isEditMode) return;
    setDraggingIndex(null);
  };

  return (
    <>
      {localEventDetails.map((item, index) => (
        <div
          key={item.id}
          draggable={isEditMode}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
          onDragEnd={handleDragEnd}
        >
          <CourseDetailListView
            id={item.id}
            starName="임시"
            title={item.title}
            eventImage={item.mainImage}
            startDate={item.startDate}
            endDate={item.endDate}
            index={index + 1}
            isEditMode={isEditMode}
          />
        </div>
      ))}
    </>
  );
};

export default DraggableEventList;
