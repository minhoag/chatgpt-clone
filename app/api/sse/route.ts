import { NextRequest } from "next/server";

import db from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  let responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();
  let isWriterClosed = false;

  request.signal.onabort = () => {
    console.log("closing writer");
    if (!isWriterClosed) {
      writer.close();
      isWriterClosed = true;
    }
  };

  function sendData(data: any) {
    if (!isWriterClosed) {
      const formattedData = `data: ${JSON.stringify(data)}\n\n`;

      writer.write(encoder.encode(formattedData));
    }
  }

  async function checkForUpdates() {
    try {
      const conversations = await db.conversation.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      sendData(conversations);
    } catch (error) {
      console.error("Error querying the database:", error);
      sendData({ error: "Failed to fetch conversations" });
    }
  }

  await checkForUpdates();

  const intervalId = setInterval(checkForUpdates, 10000);

  request.signal.onabort = () => {
    clearInterval(intervalId);
    if (!isWriterClosed) {
      writer.close();
      isWriterClosed = true;
    }
  };

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
