import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ssePublisher } from "@/infrastructure/sse/ssePublisher";

export const runtime = "nodejs";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let userId: string;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    userId = decoded.id;
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const encoder = new TextEncoder();
  let interval: NodeJS.Timeout;

  const stream = new ReadableStream({
    start(controller) {
      ssePublisher.addClient(userId, {
        write: (data) => controller.enqueue(encoder.encode(data)),
        close: () => controller.close(),
      });

      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: "CONNECTED" })}\n\n`)
      );

      interval = setInterval(() => {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "PING", timestamp: Date.now() })}\n\n`
          )
        );
      }, 10000);
    },

    cancel() {
      clearInterval(interval);
      ssePublisher.removeClient(userId);
    },
  });

  return new NextResponse(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
