"use client";

import { useEffect } from "react";
import { useAlertStore } from "@/store/useAlertStore";

export const useQueueSSE = () => {
  const showAlert = useAlertStore((state) => state.showAlert);

  useEffect(() => {
    const connectSSE = async () => {
      try {
        const res = await fetch("/api/auth/user", { credentials: "include" });
        if (!res.ok) return;

        const eventSource = new EventSource("/api/sse/subscribe");

        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === "QUEUE_UPDATED") {
            const { title, waitingNumber, waitingAhead } = data.payload;
            showAlert("waiting", { title, waitingNumber, waitingAhead });
          }
        };

        eventSource.onerror = () => {
          eventSource.close();
        };
      } catch {}
    };

    connectSSE();
  }, [showAlert]);
};
