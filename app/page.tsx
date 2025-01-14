"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { Connecting } from "@/app/connecting";
import { Introducing } from "@/components/introducting";
import Navigation from "@/components/navigation";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //@ts-ignore
  const role: string = session?.user.role === "admin" ? "Premium" : "Free";

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
      <div className="flex flex-col items-center gap-4 justify-center">
        <Introducing />
        <div className="max-w-xl relative px-4 text-center">
          <strong className="font-bold text-sm md:text-base">
            {session
              ? `Welcome back, ${session.user.name}`
              : "Hi there, stranger!"}
          </strong>
          <br />
          <span className="block text-sm md:text-base sm:inline">
            {" "}
            You are currently on the{" "}
            <span className="font-semibold">{role}</span> plan.
          </span>
          <br />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-2">
          <div
            className="flex w-full max-w-2xl flex-col items-start justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            style={{ opacity: 1, willChange: "auto", transform: "none" }}
          >
            <button
              className="items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto text-background flex gap-2 rounded-lg"
              onClick={handleClick}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                height={24}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                width={24}
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="4 17 10 11 4 5" />
                <line x1={12} x2={20} y1={19} y2={19} />
              </svg>
              Get Started
            </button>
          </div>
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
