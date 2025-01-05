"use client";
import { VerifiedIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import Navigation from "@/app/forget/navigation";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();

  return (
    <div className="max-w-xl mx-auto">
      <Navigation />
      <div className="mx-auto min-h-48 max-w-fit relative flex flex-col justify-center">
        <div
          className="flex flex-col flex-1 p-8 text-center justify-center items-center gap-4"
          data-event-id=""
        >
          <div
            className="flex justify-center border-2 border-foreground rounded-full"
            style={{
              display: "flex",
              width: "5rem",
              height: "5rem",
              marginBottom: "var(--spacing-3)",
              backgroundImage: "var(--image)",
              backgroundPosition: "var(--position, center)",
              backgroundRepeat: "no-repeat",
              alignItems: "center",
            }}
          >
            <VerifiedIcon size={42} />
          </div>

          <section className="block">
            <h1
              className="text-md font-bold my-4 leading-5 md:text-xl"
              role="presentation"
            >
              Password reset successfully!
            </h1>

            <p className="max-w-sm my-8 text-sm md:text-base">
              Your password has been reset. <br className="md:hidden" />
              Head back to your login page and use your new password to login.
            </p>
            <Button
              className="border-foreground hover:bg-foreground hover:text-background"
              variant="outline"
              onClick={() => router.push("/login")}
            >
              Return to Login
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
