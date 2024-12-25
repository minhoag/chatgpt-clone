"use server";

import { z } from "zod";
import { signIn } from "@/lib/auth";
import { formSchema } from "./zod";

export async function login(values: z.infer<typeof formSchema>) {
  try {
    await signIn("credentials", { ...values, redirect: false })
        .then(({ ok, error }) => {
          if (ok) {
            return 200
          } else {
            return 500
          }
        })
  } catch (error: any) {
    return 404;
  }
}
