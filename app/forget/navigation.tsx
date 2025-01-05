"use client";

import React from "react";

import { LogoChatGPT } from "@/components/logo";
import ToggleTheme from "@/components/toggle";

export default function Navigation() {
  return (
    <nav
      className="w-full mx-auto grid grid-cols-12 items-center h-24 mb-7 top-0 sticky bg-background lg:max-w-4xl"
      style={{ zIndex: "20" }}
    >
      <div className="col-span-11 mx-auto">
        <LogoChatGPT />
      </div>
      <div className="relative col-span-1 flex flex-row items-center">
        <ToggleTheme />
      </div>
    </nav>
  );
}
