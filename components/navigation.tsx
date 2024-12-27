"use client";

import Link from "next/link";
import { LogoChatGPT } from "./logo";
import { Button, buttonVariants } from '@/components/ui/button'
import ToggleTheme from "./toggle";

export default function Navigation({ login } : {login: boolean}) {
    const handleLogout = async () => {
        try {
            await fetch('/api/logout', {
                method: 'POST',
            });
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };
    return (
    <nav className="w-full mx-auto max-w-6xl flex flex-row items-center justify-between h-24 mb-7 top-0 sticky bg-background">
      <LogoChatGPT />
      <div className="flex flex-row items-center">
        <ToggleTheme />
        {!login ? (
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
              <Button
                  variant="link"
                  className="text-base"
                  onClick={handleLogout}
              >
                  Logout
              </Button>
          </>
        )}
      </div>
    </nav>
  );
}
