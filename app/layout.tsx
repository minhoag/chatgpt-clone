import type { Metadata } from "next";

import { Space_Grotesk } from "next/font/google";
import Script from "next/script";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import NextSessionProvider from "@/components/session-provider";
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
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning className={`${font.className}`}>
        <ThemeProvider
          disableTransitionOnChange
          enableSystem
          attribute="class"
          defaultTheme="dark"
        >
          <NextSessionProvider>
            <main className="mx-auto sm:px-10 px-5">
              {children}
              <Script src="/script.js" />
            </main>
            <Toaster />
          </NextSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
