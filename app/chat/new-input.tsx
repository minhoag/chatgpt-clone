"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createNewChatSession } from "@/app/chat/action";
import { LoadingSpinner } from "@/components/icon/icon";
import { Textarea } from "@/components/ui/textarea";

export default function NewInput({
  action,
}: {
  action: (message: string, isThinking: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      console.log("Loading state is true");
    }
  }, [loading]);

  async function handleSubmit() {
    if (!message) return;
    setLoading(true);
    action(message, true);
    const chatSession = await createNewChatSession(message);

    setLoading(false);
    router.push(`/chat/${chatSession.id}`);
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full cursor-text flex-col rounded-3xl px-2.5 py-1 transition-colors contain-inline-size bg-[#f4f4f4] dark:bg-[#2d2d2d]">
        <Textarea
          className="block h-10 w-full text-base border-0 bg-transparent p-0"
          name="message"
          placeholder={loading ? "Chat is generating..." : "Message ChatGPT"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex" style={{ justifyContent: "flex-end" }}>
          <Button
            className="relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9"
            disabled={loading}
            onClick={handleSubmit}
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
      </div>
    </div>
  );
}
