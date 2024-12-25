"use server";

import { z } from "zod";
import { signIn } from "@/lib/auth";
import { formSchema } from "./zod";

export async function login(values: z.infer<typeof formSchema>) {
  try {
    const { email, password } = values;
    const res = await signIn("credentials", { email, password });
    return 200;
  } catch (error: any) {
    return 404;
  }
}
