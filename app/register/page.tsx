"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { useToast } from "@/components/ui/use-toast";
import { checkEnvironment } from "@/lib/utils";

const formSchema = z
  .object({
    email: z
      .string({ required_error: "Please fill in this field." })
      .min(1, { message: "Please fill in this field." })
      .email({
        message: "Please enter a valid email address (Ex: johndoe@domain.com).",
      }),
    firstname: z
      .string({ required_error: "Please fill in this field." })
      .min(1, { message: "Please fill in this field." }),
    lastname: z
      .string({ required_error: "Please fill in this field." })
      .min(1, { message: "Please fill in this field." }),
    password: z
      .string({ required_error: "Please fill in this field." })
      .min(8, { message: "Must be a minimum of 8 characters." })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z
      .string({ required_error: "Please fill in this field." })
      .min(8, { message: "Must be a minimum of 8 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Your passwords don't match",
    path: ["confirmPassword"],
  });

export default function Page() {
  const { toast } = useToast();
  const [state, setState] = useState<{
    variant: "default" | "destructive";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const baseUrl = checkEnvironment();
  const apiUrl = `${baseUrl}/api/register`;
  const login = `${baseUrl}/login`;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (state) {
      toast({
        variant: state.variant ?? "default",
        description: state.message,
      });
    }
  }, [state, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (data.error) {
        setLoading(false);
        setState({
          variant: "destructive",
          message: data.error,
        });
      } else {
        setState({
          variant: "default",
          message: "Register successfully! Redirecting you back to homepage.",
        });
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: "/",
        });
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      setState({
        variant: "destructive",
        message: "An error occurred. Please try again later.",
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="chatgpt@openai.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Nguyen" type="string" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Van A" type="string" {...field} />
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
                  <LoadingSpinner className="h-5 w-5" /> Continue
                </>
              ) : (
                "Continue"
              )}
            </Button>
            <span>
              Already have an account?
              <Link className="ml-2 hover:underline" href={login}>
                Login instead.
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}
