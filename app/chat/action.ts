"use server";

import db from "@/lib/prisma";

export type Conversation = {
  conversationId: string;
  messageId: string;
  question: string;
  answer: string;
};

interface ChatResponse {
  result: {
    role: string;
    content: string | undefined;
    refusal: string | null;
  };
  status: number;
}

const checkEnvironment = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://example.com";
};

export async function requestOpenAi(
  message: Omit<Conversation, "answer">,
): Promise<string> {
  try {
    const url = checkEnvironment().concat("/api/chat");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message.question }),
    });
    const data: ChatResponse = await response.json();

    if (!data || !data.result.content) return "Error with fetching response";

    await saveConversation({
      conversationId: message.conversationId,
      messageId: message.messageId,
      question: message.question,
      answer: data.result.content,
    });

    return data.result.content;
  } catch (error: any) {
    return "Problem: " + error.message;
  }
}

export async function saveConversation(params: Conversation): Promise<void> {
  try {
    await db.conversation.update({
      where: {
        id: params.conversationId,
      },
      data: {
        messages: {
          push: {
            messageId: Date.now().toString(),
            question: params.question,
            answer: params.answer,
          },
        },
      },
    });
  } catch (error: any) {
    console.error("Error fetching response", error);
  }
}

export async function getConversation(id: string): Promise<any> {
  return db.conversation.findUnique({
    where: {
      id: id,
    },
  });
}
