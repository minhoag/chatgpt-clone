import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/lib/auth";
import Navigation from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";
import NextAuthProvider from "@/components/session-provider";

import "./globals.css";

const font = Space_Grotesk({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "ChatGPT",
  description: "A website that clone OpenAI based login system frontend",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await auth();
  return (
    <NextAuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${font.className}`} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation user={user} />
            <main className="sm:px-10 px-5">{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </NextAuthProvider>
  );
}
