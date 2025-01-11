"use client";

import { useSession } from "next-auth/react";
import React from "react";

import Login from "@/components/login";
import Logout from "@/components/logout";
import { SelectModel } from "@/components/select-model";
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
      <div className="flex gap-2 items-center">
        {enableSidebarTrigger ? <SidebarTrigger /> : <></>}
      </div>
      {enableSidebarTrigger ? <SelectModel /> : <></>}
      {enableSidebarTrigger ? <></> : <LogoChatGPT />}
      <div className="relative flex flex-row items-center">
        <ToggleTheme
          className={session ? `absolute right-12 lg:right-24` : ""}
        />
        {!session ? <Login /> : <Logout />}
      </div>
    </nav>
  );
}
