import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { id } = await request.json();

  console.log(id);

  try {
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        role: "premium",
      },
    });

    return NextResponse.json({
      message: "You are now a Premium User!",
      status: 200,
      success: true,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({
      error: "Something went wrong",
      status: 500,
      success: false,
    });
  }
}
