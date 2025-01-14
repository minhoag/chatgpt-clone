"use client";

import { useSession } from "next-auth/react";
import React from "react";

import Account from "@/components/account";
import Login from "@/components/login";
import { SelectModel } from "@/components/select-model";
import { SidebarTrigger } from "@/components/ui/sidebar";

import ToggleTheme from "./toggle";

export default function Navigation({
  enableSidebarTrigger,
}: {
  enableSidebarTrigger: boolean;
}) {
  const { data: session } = useSession();

  return (
    <nav
      className="w-full mx-auto flex flex-row items-center justify-between h-20 top-0 sticky bg-background lg:max-w-4xl"
      style={{ zIndex: "20" }}
    >
      <div className="flex gap-2 items-center">
        {enableSidebarTrigger ? <SidebarTrigger /> : <></>}
      </div>
      {enableSidebarTrigger ? <SelectModel /> : <></>}
      <div className="relative flex flex-row items-center justify-center gap-4">
        <ToggleTheme className="bg-transparent hover:bg-transparent" />
        {!session ? (
          <Login />
        ) : (
          <Account
            avatar={session.user.image as string}
            name={session.user.name}
          />
        )}
      </div>
    </nav>
  );
}
