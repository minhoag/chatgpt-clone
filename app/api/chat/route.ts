import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const isEmpty = (str: string) => !str.trim().length;

export async function POST(req: NextRequest, res: NextResponse) {
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
      model: "gpt-4o-mini",
      max_tokens: 2048,
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({
      result: completion.choices[0].message,
      status: 200,
    });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);

      return NextResponse.json({
        status: 500,
        error: error.response.data,
      });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);

      return NextResponse.json({
        status: 500,
        error: error.message,
      });
    }
  }
}
