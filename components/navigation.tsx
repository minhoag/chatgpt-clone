"use client";

import Link from "next/link";
import { LogoChatGPT } from "./logo";
import { buttonVariants } from "@/components/ui/button";
import ToggleTheme from "./toggle";
import { ButtonSignOut } from "@/components/sign-out";

export default function Navigation({ user }: { user: any }) {
  return (
    <nav className="w-full mx-auto max-w-6xl flex flex-row items-center justify-between h-24 mb-7 top-0 sticky bg-background">
      <LogoChatGPT />
      <div className="flex flex-row items-center">
        <ToggleTheme />
        {!user ? (
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
            <ButtonSignOut />
          </>
        )}
      </div>
    </nav>
  );
}
