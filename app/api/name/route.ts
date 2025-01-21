import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { isEmpty } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (isEmpty(message)) {
    return NextResponse.json({
      status: 500,
      error: {
        message: "No message is provided. Please provide a question.",
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
      model: "gpt-4o",
      max_tokens: 24,
      temperature: 0.5,
      top_p: 0.5,
      messages: [
        {
          role: "assistant",
          content: "Hello, how can I help you today?",
        },
        {
          role: "user",
          content: `Summarize the conversation in 3 words or fewer in their language: ${message}`,
        },
      ],
    });

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
