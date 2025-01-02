"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createNewChatSession } from "@/app/chat/action";
import { LoadingSpinner } from "@/components/icon/icon";

export default function NewInput() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      console.log("Loading state is true");
    }
  }, [loading]);

  async function handleSubmit(formData: FormData) {
    const message = formData.get("message") as string;

    if (!message) return;
    setLoading(true);
    await createNewChatSession(message);
    setLoading(false);
  }

  return (
    <form
      className="flex flex-col items-center gap-2 sm:pr-5"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
      }}
    >
      <div className="flex w-full items-center space-x-2">
        <Input
          autoComplete="off"
          className="text-base"
          disabled={loading}
          name="message"
          placeholder={loading ? "Chat is generating..." : "Message ChatGPT..."}
        />
        <Button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9"
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <LoadingSpinner className={"h-5 w-5"} />
          ) : (
            <svg
              className="lucide lucide-send"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          )}
        </Button>
      </div>
    </form>
  );
}
