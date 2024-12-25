"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import Link from "next/link";
import { formSchema } from "./zod";
import { login } from "./submit";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [state, setState] = useState({ message: "" });

  useEffect(() => {
    toast({
      description: state.message,
    });
  }, [state, toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res: 200 | 404 = await login(values);
      if (res === 404) {
        return setState({
          message: "Logged in failed: User not found",
        });
      }
      return router.push("/");
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <Input type="password" required {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Link href="#" className="relative top-2 text-sm hover:underline">
            Forgot password?
          </Link>
          <div className="flex flex-wrap flex-col items-center gap-3 text-sm md:flex-row md:justify-between">
            <Button type="submit">Continue</Button>
            <span>
              Don&#39;t have an account?
              <Link href="/register" className="ml-2 hover:underline">
                Sign up.
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}
