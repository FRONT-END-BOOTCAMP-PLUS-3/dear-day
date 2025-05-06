"use client";

import { useEffect } from "react";
import { useAlertStore } from "@/store/useAlertStore";

export const useQueueSSE = (userId: string | undefined) => {
  const showAlert = useAlertStore((state) => state.showAlert);

  useEffect(() => {
    if (!userId) return;

    const eventSource = new EventSource(`/api/sse/subscribe?userId=${userId}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "QUEUE_UPDATED") {
          const { title, waitingNumber, waitingAhead } = data.payload;
          showAlert("waiting", { title, waitingNumber, waitingAhead });
        }
      } catch (e) {
        console.error("SSE message parse error:", e);
      }
    };

    eventSource.onerror = () => {
      console.warn("SSE connection error. Will retry...");
    };

    return () => {
      eventSource.close();
    };
  }, [userId, showAlert]);
};
