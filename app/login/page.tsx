"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { LoadingSpinner } from "@/components/icon/icon";
import Navigation from "@/components/navigation";
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

import { formSchema } from "./schema";

export default function Page() {
  const register = `/register`;

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const { email, password } = values;

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setLoading(false);

        return toast.error(
          "There is a problem with connecting to the server. Please try again later.",
        );
      }
      toast.success("Login successfully. Welcome back!");

      return router.push("/");
    } catch (error: any) {
      setLoading(false);

      return toast.error("Internal Server Error (500). " + error.message);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <Navigation enableSidebarTrigger={false} />
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input required type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Link
            aria-label="Redirect to Forgot password"
            className="relative top-2 text-sm hover:underline"
            href="/forget"
          >
            Forgot password?
          </Link>
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
