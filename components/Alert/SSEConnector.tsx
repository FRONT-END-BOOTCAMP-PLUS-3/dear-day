"use client";

import { useQueueSSE } from "@/hooks/useQueueSSE";

interface SSEConnectorProps {
  userId: string | undefined;
}

export default function SSEConnector({ userId }: SSEConnectorProps) {
  useQueueSSE(userId);
  return null;
}
