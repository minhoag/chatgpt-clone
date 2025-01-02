"use server";

import { getServerSession } from "next-auth/next";
import { User } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function getCurrentUser(): Promise<User | undefined> {
  const session = await getServerSession(authOptions);

  return session?.user;
}
