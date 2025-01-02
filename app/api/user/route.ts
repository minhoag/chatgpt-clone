import { NextRequest, NextResponse } from "next/server";

import { getUserById } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id)
    return NextResponse.json({ status: 404, error: "Params not found." });
  const user = await getUserById(id);

  return NextResponse.json({
    status: 200,
    user,
  });
}
