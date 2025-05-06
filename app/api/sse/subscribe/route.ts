import { NextRequest } from "next/server";
import { ssePublisher } from "@/infrastructure/sse/ssePublisher";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  // Response 스트림 생성
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      ssePublisher.addClient(userId, {
        write: (data: string) => {
          controller.enqueue(encoder.encode(data));
        },
        close: () => {
          controller.close();
        },
      });
    },
    cancel() {
      ssePublisher.removeClient(userId);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
