import crypto from "crypto";

import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { otpStore, rateLimitStore } from "@/lib/otpStore";
import { getUserFromDb } from "@/lib/utils";

const RATE_LIMIT = 3; // Maximum number of requests
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const now = Date.now();

  if (!rateLimitStore[email]) {
    rateLimitStore[email] = { count: 0, lastRequest: now };
  }

  const { count, lastRequest } = rateLimitStore[email];

  if (now - lastRequest > RATE_LIMIT_WINDOW) {
    rateLimitStore[email] = { count: 1, lastRequest: now };
  } else {
    if (count >= RATE_LIMIT) {
      return NextResponse.json(
        { message: "Rate limit exceeded. Please try again later." },
        { status: 429 },
      );
    }
    rateLimitStore[email].count += 1;
    rateLimitStore[email].lastRequest = now;
  }

  const existEmail = await getUserFromDb(email);

  if (!existEmail) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }
  const userId = existEmail.id;
  const otp = crypto.randomInt(10000, 99999).toString();
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = now + 5 * 60 * 1000; // OTP expires in 5 minutes

  console.log("OTP:", otp);
  otpStore[userId] = { otpHash, expiresAt };

  return NextResponse.json({ userId: userId, otp: otp });
}
