"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ChatInputProps = {
  action: (message: string) => void;
};

export default function ChatInput({ action }: ChatInputProps) {
  const [message, setMessage] = useState<string>("");
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        // Allow new line when Shift + Enter is pressed
        return;
      }
      event.preventDefault();
      action(message);
    }
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex w-full cursor-text flex-col rounded-3xl px-2.5 py-1 transition-colors contain-inline-size bg-[#f4f4f4] dark:bg-[#2d2d2d]">
        <Textarea
          className="block h-10 w-full text-base border-0 bg-transparent p-0"
          name="message"
          placeholder="Message ChatGPT"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex" style={{ justifyContent: "flex-end" }}>
          <Button
            className="relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9"
            type="submit"
          >
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
          </Button>
        </div>
      </div>
    </div>
  );
}
