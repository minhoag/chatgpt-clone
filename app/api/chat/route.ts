import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { getUserFromDb, updateUserLimit } from "@/lib/utils";
import { getConversation, resetUserLimits } from "@/app/chat/action";

/** Setting for VERCEL to let this REQUEST run more than 60 seconds **/
export const maxDuration = 60;
export const dynamic = "force-dynamic";
const isEmpty = (str: string) => !str.trim().length;

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
  const { message, email } = await req.json();

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
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      max_tokens: 2048,
      temperature: 0.5,
      top_p: 0.5,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
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
