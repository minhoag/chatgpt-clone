"use server";

import { redirect } from "next/navigation";

import db from "@/lib/prisma";
import { getUser } from "@/lib/auth";

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
    : "https://chatgpt-clone-three-eta.vercel.app";
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

export async function createNewChatSession(message: string): Promise<any> {
  let dataRef: any;

  try {
    const session = await getUser();

    if (!session?.user) redirect("/login");
    const messageId: string = Date.now().toString();

    dataRef = await db.conversation.create({
      data: {
        name: message,
        userId: session.user.id,
        messages: [
          {
            answer: "Hello! How can I help you today?",
            question: "",
            messageId: messageId,
          },
        ],
      },
    });
    await requestOpenAi({
      conversationId: dataRef.id,
      messageId: messageId,
      question: message,
    });
  } catch (error: any) {
    console.error(error);
  }
  const url = checkEnvironment().concat(`/chat/${dataRef.id}`);

  redirect(url);
}
