import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { firstname, lastname, email } = await request.json();

    await db.user.update({
      where: { email },
      data: { firstname: firstname, lastname: lastname },
    });

    return NextResponse.json({
      message: "Change successful",
      error: undefined,
      status: 200,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    });
  }
}
