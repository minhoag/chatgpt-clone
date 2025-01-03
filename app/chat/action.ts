"use server";

import { redirect } from "next/navigation";

import db from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { checkEnvironment } from "@/lib/utils";

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

    if (!response.ok) {
      return "Error with fetching response";
    }

    const data: ChatResponse = await response.json();

    if (data.status === 403)
      return "Limit Exceeded. Your current limit is 10/10. Please try again next week!";
    if (!data || !data.result.content) return "Error with fetching response.";

    await saveConversation({
      conversationId: message.conversationId,
      messageId: message.messageId,
      question: message.question,
      answer: data.result.content,
    });

    return data.result.content;
  } catch (error: any) {
    console.error("Error fetching response: ", error.message);

    return "";
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
  const messageId: string = Date.now().toString();

  try {
    const session = await getUser();

    if (!session?.user) redirect("/login");

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
    const timeoutId = setTimeout(() => {
      const url = `/chat/${dataRef.id}`;

      return redirect(url);
    }, 60_000);

    await requestOpenAi({
      conversationId: dataRef.id,
      messageId: messageId,
      question: message,
    });

    clearTimeout(timeoutId);
  } catch (error: any) {
    console.error(`Error creating new chat session: ${error.message}`);
  }
  const url = `/chat/${dataRef.id}`;

  return redirect(url);
}

export async function deleteChatSession(chatId: string) {
  await db.conversation.delete({
    where: { id: chatId },
  });
}

export async function resetUserLimits(email: string): Promise<void> {
  const today = new Date();
  const dayOfWeek = today.getDay();

  if (dayOfWeek !== 1) return; // Only run on Mondays

  try {
    const user = await db.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      console.error(`User with email ${email} not found.`);

      return;
    }

    const lastReset = new Date(user.lastReset);
    const oneWeekAgo = new Date(today);

    oneWeekAgo.setDate(today.getDate() - 7);

    if (lastReset > oneWeekAgo) {
      console.log(`User limit for ${email} was already reset this week.`);

      return;
    }

    await db.user.update({
      where: { email: email },
      data: {
        limit: 0,
        lastReset: today,
      },
    });

    console.log(`User limit for ${email} has been reset.`);
  } catch (error: any) {
    console.error(
      `Error resetting user limit for user ${email}: `,
      error.message,
    );
  }
}
