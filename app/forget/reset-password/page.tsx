"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

import { resetFormSchema } from "../schema";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof resetFormSchema>>({
    resolver: zodResolver(resetFormSchema),
  });

  async function onSubmit(values: z.infer<typeof resetFormSchema>) {
    setLoading(true);
    const { password, confirmPassword } = values;
    const response = await fetch("/api/change", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, confirmPassword }),
    });

    setLoading(false);

    if (response.ok) {
      router.push(`/forget/success`);
    } else {
      const errorData = await response.json();

      toast.error(errorData.message || "Failed to send OTP. Please try again.");
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <Navigation />
      <div className="mx-auto min-h-48 max-w-fit relative flex flex-col justify-center">
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
              Please enter your new password below.
            </p>
          </div>
        </header>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-enter Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap flex-col items-center gap-3 text-sm md:flex-row md:justify-between">
            <Button disabled={loading} type="submit">
              {loading ? (
                <>
                  <LoadingSpinner className="h-5 w-5" /> Loading
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
