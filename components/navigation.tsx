"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { LogoChatGPT } from "./logo";
import ToggleTheme from "./toggle";

export default function Navigation({
  enableSidebarTrigger,
}: {
  enableSidebarTrigger: boolean;
}) {
  const { data: session } = useSession();

  return (
    <nav
      className="w-full mx-auto flex flex-row items-center justify-between h-24 mb-7 top-0 sticky bg-background lg:max-w-4xl"
      style={{ zIndex: "20" }}
    >
      {enableSidebarTrigger ? <SidebarTrigger /> : <></>}
      <LogoChatGPT />
      <div className="relative flex flex-row items-center">
        <ToggleTheme
          className={session ? `absolute right-12 lg:right-28` : ""}
        />
        {!session ? (
          <>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "text-base sm:ml-3",
                size: "sm",
              })}
              href="/login"
            >
              Login
            </Link>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "text-base",
                size: "sm",
              })}
              href="/register"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Button
              className="absolute text-base right-0"
              variant="link"
              onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
            >
              <span className="hidden text-sm lg:block">Logout </span>
              <LogOutIcon className="h-3 w-3" />
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

function LogOutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}
