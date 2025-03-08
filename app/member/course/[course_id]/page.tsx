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
  const courseId = Number(course_id);
  const { courseEvent, setCourseEvent } = useCourseStore();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [eventDetails, setEventDetails] = useState<ShowCourseEventsDto[]>([]);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/course/detail?courseId=${courseId}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          console.error("Failed to fetch event data");
          return;
        }
        const data: ShowCourseEventsDto[] = await response.json();
        setEventDetails(data);
        const newMarkers = data.map((item) => ({
          latitude: item.latitude,
          longitude: item.longitude,
          mainImage: item.imgSrc,
        }));
        setMarkers(newMarkers);
        if (courseEvent.length === 0 && data.length > 0) {
          const initialIds = data.map((event) => event.id);
          setCourseEvent(initialIds);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    }
    fetchData();
  }, [courseId, setCourseEvent, courseEvent.length]);

  const handleFinalizeOrder = useCallback(
    (finalOrder: number[]) => {
      setCourseEvent(finalOrder);
    },
    [setCourseEvent]
  );

  return (
    <div className={styles.homeContainer}>
      <div className={styles.mapSection}>
        <MapLoader markers={markers} />
      </div>
      <BottomSheet>
        <EditHeader
          courseId={courseId}
          isEditMode={isEditMode}
          onToggleEditMode={() => setIsEditMode((prev) => !prev)}
        />
        <DraggableEventList
          isEditMode={isEditMode}
          initialEventDetails={eventDetails}
          onFinalizeOrder={handleFinalizeOrder}
        />
      </BottomSheet>
    </div>
  );
}
