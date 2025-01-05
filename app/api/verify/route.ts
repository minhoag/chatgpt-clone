import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { otpStore } from "@/lib/otpStore";

export async function POST(req: NextRequest) {
  const { id, otp } = await req.json();
  const storedOtp = otpStore[id];

  if (storedOtp && storedOtp.expiresAt > Date.now()) {
    const isValid = await bcrypt.compare(otp, storedOtp.otpHash);

    if (isValid) {
      return NextResponse.json({ valid: true });
    }
  }

  return NextResponse.json({ valid: false });
}
