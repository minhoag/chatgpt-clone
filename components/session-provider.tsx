"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function NextSessionProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
