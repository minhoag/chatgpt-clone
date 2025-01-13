import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { getConversation, resetUserLimits } from "@/app/chat/action";
import { getUserFromDb, isEmpty, updateUserLimit } from "@/lib/utils";

/** Setting for VERCEL to let this REQUEST run more than 60 seconds **/
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id)
    return NextResponse.json({ status: 404, error: "Params not found." });
  const conversations = await getConversation(id);

  return NextResponse.json({
    status: 200,
    conversations,
  });
}

export async function POST(req: NextRequest) {
  const { conversationId, message, email, model } = await req.json();

  if (isEmpty(message)) {
    return NextResponse.json({
      status: 500,
      error: {
        message: "No message is provided. Please provide a question.",
      },
    });
  }

  const user = await getUserFromDb(email);

  if (!user) {
    return NextResponse.json({
      status: 404,
      error: {
        message: "User not found.",
      },
    });
  }

  if (user.role !== "admin" && user.limit >= 10) {
    return NextResponse.json({
      status: 403,
      error: {
        limit: user.limit,
        message: "Request limit exceeded.",
      },
    });
  }

  const apiKey: string | undefined = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      status: 500,
      error: {
        message:
          "OpenAI API key not configured, please add a key to the environment variable OPENAI_API_KEY.",
      },
    });
  }

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  try {
    const chatHistory = await getConversation(conversationId);
    let prevChat: { role: "assistant" | "user"; content: string }[] =
      chatHistory
        ? chatHistory.messages.flatMap((msg: any) => [
            { role: "user", content: msg.question },
            { role: "assistant", content: msg.answer },
          ])
        : [{ role: "user", content: "" }];

    const completion = await openai.chat.completions.create({
      model: model,
      max_tokens: 2048,
      temperature: 0.5,
      top_p: 0.5,
      messages: [...prevChat, { role: "user", content: message }],
    });

    if (user.role !== "admin") {
      await resetUserLimits(user.email);
      await updateUserLimit(user.email, user.limit + 1);
    }

    return NextResponse.json({
      result: completion.choices[0].message,
      status: 200,
    });
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json({
        status: 500,
        error: error.response.data,
      });
    } else {
      return NextResponse.json({
        status: 500,
        error: error.message,
      });
    }
  }
}
