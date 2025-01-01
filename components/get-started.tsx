"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React from "react";

import { buttonVariants } from "@/components/ui/button";
import { ArrowChatGPT } from "@/components/icon/icon-gpt";

export default function GetStartedButton() {
  const { data: session, status } = useSession();
  const url = status === "authenticated" ? "/chat" : "/login";

  return (
    <>
      <div className="px-4 py-3 relative text-center">
        <strong className="font-bold">
          {session
            ? `Welcome back, ${session.user.name}`
            : "Hi there, stranger!"}
        </strong>
        <br />
        <span className="block sm:inline">
          {" "}
          We&#39;re glad to have you here. Get started by clicking the button
          below.
        </span>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-2">
        <Link className={buttonVariants({ size: "lg" })} href={url}>
          Get started <ArrowChatGPT props="w-2 h-2 ml-2" />
        </Link>
        <Link
          className={buttonVariants({
            variant: "link",
            className: "text-base sm:ml-3",
            size: "sm",
          })}
          href="/login"
        >
          Learn about ChatGPT
        </Link>
      </div>
    </>
  );
}
