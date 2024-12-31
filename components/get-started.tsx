"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { buttonVariants } from "@/components/ui/button";
import { checkEnvironment } from "@/lib/utils";

export default function GetStartedButton() {
  const { data: session, status } = useSession();
  const url = status === "authenticated" ? "/chat" : "/login";

  return (
    <>
      <div className="px-4 py-3 relative text-center">
        <strong className="font-bold">
          {session ? `Welcome back ${session.user.name} !` : "Hi, there!"}
        </strong>
        <br />
        <span className="block sm:inline">
          {" "}
          We&#39;re glad to have you here. Get started by clicking the button
          below.
        </span>
      </div>
      <Link
        className={buttonVariants({ size: "lg" })}
        href={checkEnvironment().concat(url)}
      >
        Get started
      </Link>
    </>
  );
}
