"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

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
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin fill-[#18181B] dark:fill-white"
              fill="none"
              viewBox="0 0 100 101"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
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
