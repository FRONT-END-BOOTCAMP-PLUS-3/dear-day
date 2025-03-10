"use client";

import MapLoader from "@/components/MapLoader/MapLoader";
import styles from "./page.module.scss";
import BottomSheet from "@/components/BottomSheet/BottomSheet";
import { useState, useCallback, useEffect } from "react";
import { useCourseStore } from "@/store/courseStore";
import EditHeader from "./_components/EditHeader/EditHeader";
import DraggableEventList from "./_components/DraggableEventList/DraggableEventList";
import { useParams } from "next/navigation";
import { ShowCourseEventsDto } from "@/application/usecases/course/dto/ShowCourseEventsDto";

export interface MarkerData {
  latitude: number;
  longitude: number;
  mainImage: string;
}

export default function CoursePage() {
  const { course_id } = useParams();
  const { courseEvent, setCourseEvent, isEditMode, setIsEditMode } =
    useCourseStore();
  const [eventDetails, setEventDetails] = useState<ShowCourseEventsDto[]>([]);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/course/detail?courseId=${course_id}`,
          { method: "GET" }
        );
        if (!response.ok) {
          console.error("Failed to fetch event data");
          return;
        }
        const data: ShowCourseEventsDto[] = await response.json();
        setEventDetails(data);
        if (courseEvent.length === 0 && data.length > 0) {
          const initialIds = data.map((event) => event.id);
          setCourseEvent(initialIds);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    }
    fetchData();
  }, [course_id, setCourseEvent, courseEvent.length]);

  useEffect(() => {
    const newMarkers = eventDetails.map((item) => ({
      latitude: item.latitude,
      longitude: item.longitude,
      mainImage: item.imgSrc,
    }));
    setMarkers(newMarkers);
  }, [eventDetails]);

  const handleOrderChange = useCallback(
    (newOrder: number[]) => {
      setCourseEvent(newOrder);
    },
    [setCourseEvent]
  );

  const handleEnableEditMode = () => {
    setIsEditMode(true);
  };

  const handleDisableEditMode = async () => {
    const orderValues = eventDetails.map((_, index) => index);
    try {
      const response = await fetch(`/api/course/detail`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: courseEvent,
          order: orderValues,
        }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("코스 순서 업데이트 실패");
      }
      console.log("코스 순서 업데이트 성공");
    } catch (error) {
      console.error("코스 순서 업데이트 에러:", error);
    }
    setIsEditMode(false);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.mapSection}>
        <MapLoader markers={markers} />
      </div>
      <BottomSheet>
        <EditHeader
          courseId={Number(course_id)}
          isEditMode={isEditMode}
          onEnableEditMode={handleEnableEditMode}
          onDisableEditMode={handleDisableEditMode}
        />
        <DraggableEventList
          isEditMode={isEditMode}
          initialEventDetails={eventDetails}
          onOrderChange={handleOrderChange}
        />
      </BottomSheet>
    </div>
  );
}
