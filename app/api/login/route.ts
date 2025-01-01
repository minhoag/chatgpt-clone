import { NextRequest, NextResponse } from "next/server";

import { getUserFromDb, verifyPassword } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    console.log(request);
    const { email, password } = reqBody;

    const user = await getUserFromDb(email);

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        { status: 400 },
      );
    }

    // compare hashed password
    const passwordOk = user && verifyPassword(password, user.passwordHash);

    if (!passwordOk) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      message: "Logged In successfully",
      data: {
        name: user.firstname + " " + user.lastname,
        email: user.email,
      },
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
