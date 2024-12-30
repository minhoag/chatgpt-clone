import { generateRandomId } from "@/lib/utils";
import db from "@/lib/prisma";

export type Message = {
  id: number;
  message: string;
  isUser: boolean;
};

interface ChatResponse {
  result: {
    role: string;
    content: string | undefined;
    refusal: string | null;
  };
  status: number;
}

export async function getResponse(message: string) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data: ChatResponse = await response.json();

    return data.result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function createChatSession(name: string, userId: string) {
  const session = await db.conversation.create({
    data: {
      name: name,
      messages: [
        {
          id: generateRandomId(),
          message: "Hello! How can I help you today?",
          isUser: false,
        },
      ],
      userId: userId,
    },
  });

  return session;
}

export async function storeMessage(sessionId: string, message: Message) {
  await db.conversation.update({
    where: {
      id: sessionId,
    },
    data: {
      messages: {
        push: message,
      },
    },
  });
}

export async function getChatSession(userId: string) {
  return db.conversation.findMany({
    where: { userId },
  });
}
