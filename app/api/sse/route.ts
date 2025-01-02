import { NextRequest } from "next/server";

import db from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  let responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  // Close if client disconnects
  request.signal.onabort = () => {
    console.log("closing writer");
    writer.close();
  };

  // Function to send data to the client
  function sendData(data: any) {
    const formattedData = `data: ${JSON.stringify(data)}\n\n`;

    writer.write(encoder.encode(formattedData));
  }

  // Function to check for database changes and send updates
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

  // Initial data send
  await checkForUpdates();

  // Set up a polling mechanism to check for updates every 5 seconds
  const intervalId = setInterval(checkForUpdates, 5000);

  // Clean up on client disconnect
  request.signal.onabort = () => {
    clearInterval(intervalId);
    writer.close();
  };

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
