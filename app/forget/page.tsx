"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import Navigation from "@/app/forget/navigation";
import { LoadingSpinner } from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { checkEnvironment } from "@/lib/utils";

import { formSchema } from "./schema";

export default function Page() {
  const baseUrl = checkEnvironment();
  const register = `${baseUrl}/register`;

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { email } = values;
    const response = await fetch("/api/forget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (response.ok) {
      const res = await response.json();
      const userId = res.userId;

      toast.success(`OTP is ${res.otp}. (Testing purposes only)`);
      await navigator.clipboard.writeText(res.otp);
      router.push(`/forget/${userId}`);
    } else {
      const errorData = await response.json();

      toast.error(errorData.message || "Failed to send OTP. Please try again.");
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <Navigation />
      <div className="min-h-48 max-w-fit relative flex flex-col justify-center">
        <header
          className="leading-normal text-center"
          style={{
            padding: "40px 40px 24px",
          }}
        >
          <h1 className="text-xl font-bold text-foreground">
            Reset your password
          </h1>
          <div className="text-center">
            <p className="text-base inline">
              Enter your Email address and we will send you a One-time Password
              with instructions to reset your password.
            </p>
          </div>
        </header>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email-address</FormLabel>
                <FormControl>
                  <Input placeholder="chatgpt@openai.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap flex-col items-center gap-3 text-sm md:flex-row md:justify-between">
            <Button disabled={loading} type="submit">
              {loading ? (
                <>
                  <LoadingSpinner className="h-5 w-5" /> Continue
                </>
              ) : (
                "Continue"
              )}
            </Button>
            <span>
              Don&#39;t have an account?
              <Link className="ml-2 hover:underline" href={register}>
                Sign up.
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}
