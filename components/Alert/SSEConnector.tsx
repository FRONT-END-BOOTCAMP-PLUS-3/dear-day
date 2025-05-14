"use client";

import { useQueueSSE } from "@/hooks/useQueueSSE";

export default function SSEConnector() {
  useQueueSSE();
  return null;
}
