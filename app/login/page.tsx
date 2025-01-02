"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

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
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/navigation";
import { LoadingSpinner } from "@/components/icon/icon";
import { checkEnvironment } from "@/lib/utils";

import { formSchema } from "./zod";

export default function Page() {
  const baseUrl = checkEnvironment();
  const register = `${baseUrl}/register`;

  const router = useRouter();
  const { toast } = useToast();
  const [state, setState] = useState<{
    variant: string;
    title: string;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state) {
      toast({
        //@ts-ignore
        variant: state.variant ?? "default",
        title: state.title,
        description: state.message,
      });
    }
  }, [state, toast]);

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

        return setState({
          variant: "destructive",
          title: "Authentication Failed",
          message: "Please check again your email and passwords.",
        });
      }

      return router.push("/");
    } catch (error: any) {
      setLoading(false);

      return setState({
        variant: "destructive",
        title: "Something went wrong",
        message: "Internal Server Error (500). " + error.message,
      });
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
          <Link className="relative top-2 text-sm hover:underline" href="#">
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
