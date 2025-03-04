"use client";

// import MapLoader from "@/components/MapLoader/MapLoader";
import styles from "./page.module.scss";
import BottomSheet from "@/components/BottomSheet/BottomSheet";
import { useState, useCallback } from "react";
import { useCourseStore } from "@/store/courseStore";
import EditHeader from "./_components/EditHeader/EditHeader";
import { Event } from "@prisma/client";
import DraggableEventList from "./_components/DraggableEventList/DraggableEventList";

export interface MarkerData {
  latitude: number;
  longitude: number;
  mainImage: string;
}

export default function CoursePage() {
  const { setCourseEvent } = useCourseStore();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [eventDetails, setEventDetails] = useState<Event[]>([]);
  // const [markers, setMarkers] = useState<MarkerData[]>([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch("/api/course/detail");
  //       if (!response.ok) {
  //         console.error("Failed to fetch event data");
  //         return;
  //       }
  //       const data: Event[] = await response.json();
  //       setEventDetails(data);
  //       const newMarkers = data.map((item) => ({
  //         latitude:
  //           typeof item.latitude.toNumber === "function"
  //             ? item.latitude.toNumber()
  //             : Number(item.latitude),
  //         longitude:
  //           typeof item.longitude.toNumber === "function"
  //             ? item.longitude.toNumber()
  //             : Number(item.longitude),
  //         mainImage: item.mainImage,
  //       }));
  //       setMarkers(newMarkers);
  //       if (courseEvent.length === 0 && data.length > 0) {
  //         const initialIds = data.map((event) => event.id);
  //         setCourseEvent(initialIds);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching event data:", error);
  //     }
  //   }
  //   fetchData();
  // }, [setCourseEvent, courseEvent.length]);

  const handleFinalizeOrder = useCallback(
    (finalOrder: number[]) => {
      setCourseEvent(finalOrder);
    },
    [setCourseEvent]
  );

  return (
    <div className={styles.homeContainer}>
      <div className={styles.mapSection}>
        {/* <MapLoader markers={markers} /> */}
      </div>
      <BottomSheet>
        <EditHeader
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
