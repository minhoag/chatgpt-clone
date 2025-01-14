import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (data.password) {
      const { email, password } = data;
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      await db.user.update({
        where: { email: email },
        data: { passwordHash: hashedPassword },
      });

      return NextResponse.json({
        message: "Change successful",
        error: undefined,
        status: 200,
        success: true,
      });
    } else {
      const { email, firstname, lastname } = data;

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
    }
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    });
  }
}
