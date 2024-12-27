"use client";

import Link from "next/link";
import { LogoChatGPT } from "./logo";
import { Button, buttonVariants } from "@/components/ui/button";
import ToggleTheme from "./toggle";
import { useSession, signOut } from "next-auth/react";
import React from 'react'

export default function Navigation() {
    const { data: session } = useSession()
  return (
    <nav className="w-full max-w-xs mx-auto flex flex-row items-center justify-between h-24 mb-7 top-0 sticky bg-background sm:max-w-lg lg:max-w-4xl">
      <LogoChatGPT />
      <div className="flex flex-row items-center">
        <ToggleTheme />
        {!session ? (
          <>
            <Link
              href="/login"
              className={buttonVariants({
                variant: "link",
                className: "text-base sm:ml-3",
                size: "sm",
              })}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={buttonVariants({
                variant: "link",
                className: "text-base",
                size: "sm",
              })}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Button variant="link" onClick={() => signOut()} className="text-base">
                <span className="hidden mr-2 lg:block">Logout </span><LogOutIcon className="h-4 w-4" />
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
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
    )
}
