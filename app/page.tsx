"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { Connecting } from "@/app/connecting";
import { ArrowChatGPT } from "@/components/icon/icon-gpt";
import Navigation from "@/components/navigation";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //@ts-ignore
  const role: string = session?.user.role === "admin" ? "Premium" : "Free";
  const limit: string =
    //@ts-ignore
    session?.user.role === "admin"
      ? "unlimited usage"
      : //@ts-ignore
        `${10 - session?.user.limit} free credits`;

  const handleClick = () => {
    if (status === "authenticated") {
      setLoading(true);
      setTimeout(() => {
        router.push("/chat");
      }, 1000);
    } else {
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Connecting />
      </div>
    );
  }

  return (
    <>
      <Navigation enableSidebarTrigger={false} />
      <div className="flex flex-col items-center gap-5 justify-center h-[70vh]">
        <h1 className="text-4xl font-bold text-center">Introducing ChatGPT</h1>
        <div className="px-4 py-3 relative text-center">
          <strong className="font-bold">
            {session
              ? `Welcome back, ${session.user.name}`
              : "Hi there, stranger!"}
          </strong>
          <br className={session ? "block" : "hidden"} />
          <span className={`${session ? "block" : "hidden"}`}>
            {" "}
            You are currently using our <b>{role}</b> plan.
          </span>
          <span className={session ? "block ml-2" : "hidden"}>
            You have {limit}.
          </span>
          <br />
          <span className="block sm:inline">
            {" "}
            We&#39;re glad to have you here. Get started by clicking the button
            below.
          </span>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-2">
          <button
            className={buttonVariants({ size: "lg" })}
            onClick={handleClick}
          >
            Get started <ArrowChatGPT props="w-2 h-2 ml-2" />
          </button>
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
      </div>
    </>
  );
}
