import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProfileForm({
  setAction,
}: {
  setAction: (value: boolean) => void;
}) {
  const { data: session, update } = useSession();

  if (!session) {
    redirect("/login");
  }
  // Get user data from session
  //@ts-ignore
  const firstname: string = session.user.first_name;
  //@ts-ignore
  const lastname: string = session.user.last_name;
  const email: string = session.user.email;
  //Get url when in production
  const apiUrl = `/api/change`;

  // Form schema control Account
  const SchemaAccount = z.object({
    firstname: z.string({ required_error: "Please fill in this field." }),
    lastname: z.string({ required_error: "Please fill in this field." }),
  });

  const formAccount = useForm<z.infer<typeof SchemaAccount>>({
    resolver: zodResolver(SchemaAccount),
    defaultValues: {
      firstname: "",
      lastname: "",
    },
  });

  //Handle change account submission
  async function onSubmitAccount(values: z.infer<typeof SchemaAccount>) {
    // This is because we are not going to ask for the user email (user already signed in)
    const total_value = { ...values, email: email };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(total_value),
      });
      const data = await response.json();

      if (data.error) {
        toast.error("Internal Error", {
          description: data.error,
        });
      }
      toast.success("Change Complete", {
        description: "Your account has been updated.",
      });
      update({
        name: total_value.firstname + " " + total_value.lastname,
      });
      setAction(false); // Close the dialog   } catch {

      return;
    } catch (error: any) {
      toast.error("Internal Error", {
        description: error.message,
      });
    }
  }

  // Form schema Password
  const SchemaPassword = z
    .object({
      /*oldPassword: z.string({ required_error: "Please fill in this field." }),*/
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

  // Resolve form password
  const formPassword = useForm<z.infer<typeof SchemaPassword>>({
    resolver: zodResolver(SchemaPassword),
  });

  // Handle change password submission
  async function onSubmitPassword(values: z.infer<typeof SchemaPassword>) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: values.password }),
      });
      const data = await response.json();

      if (data.error) {
        toast.error("Internal Error", {
          description: data.error,
        });
      }
      toast.success("Change Complete", {
        description: "Your password has been updated.",
      });
      setAction(false); // Close the dialog
      signOut({ redirect: true, callbackUrl: "/login" });
    } catch (error: any) {
      toast.error("Internal Error", {
        description: error.message,
      });
    }
  }

  return (
    <>
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger id="account-tab" value="account">
            Account
          </TabsTrigger>
          <TabsTrigger id="password-tab" value="password">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent id="account-content" value="account">
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&#39;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...formAccount}>
                <form
                  className="space-y-4"
                  onSubmit={formAccount.handleSubmit(onSubmitAccount)}
                >
                  <FormField
                    control={formAccount.control}
                    name={"firstname"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder={firstname} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formAccount.control}
                    name={"lastname"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder={lastname} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    className="hidden md:block"
                    type="submit"
                    onClick={() => setAction(false)}
                  >
                    Confirm Change
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent id="password-content" value="password">
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&#39;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...formPassword}>
                <form
                  className="space-y-4"
                  onSubmit={formPassword.handleSubmit(onSubmitPassword)}
                >
                  <FormField
                    control={formPassword.control}
                    name="password"
                    render={({ field }) => (
                      <div className="space-y-1">
                        <FormLabel htmlFor="password">New Password</FormLabel>
                        <FormControl>
                          <Input
                            id="password-change"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                      </div>
                    )}
                  />
                  <FormField
                    control={formPassword.control}
                    name={"confirmPassword"}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <FormLabel htmlFor="confirmPassword">
                          Confirm New Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="confirm-password-change"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                      </div>
                    )}
                  />
                  <Button className="hidden md:block" type="submit">
                    Confirm Change
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
