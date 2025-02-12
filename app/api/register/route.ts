import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { createUser, getUserFromDb } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, firstname, lastname, password } = reqBody;

    const user = await getUserFromDb(email);

    if (user) {
      return NextResponse.json({
        error:
          "Someone has already registered with this email address. Try another one?",
        status: 400,
        success: false,
      });
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await createUser(email, firstname, lastname, hashedPassword);

    return NextResponse.json({
      message: "User created!",
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
