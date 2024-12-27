import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserFromDb } from "@/lib/utils";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, firstname, lastname, password } = reqBody;

    // REMOVE IN PRODUCTION
    console.log(reqBody);

    const user = await getUserFromDb(email);
    if (user) {
      return NextResponse.json(
        {
          error: "This user already exists",
        },
        { status: 400 },
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    await createUser(email, firstname, lastname, hashedPassword);
    return NextResponse.json({
      message: "User created!",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
