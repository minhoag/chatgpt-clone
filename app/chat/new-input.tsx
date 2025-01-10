"use client";

import { useEffect, useState } from "react";

import { createNewChatSession, getConversation } from "@/app/chat/action";
import { LoadingSpinner } from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const maxDuration = 60;

export default function NewInput({
  action,
}: {
  action: (message: string, isThinking: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [defaultValue, setDefaultValue] = useState("gpt-4o");

  useEffect(() => {
    const savedValue = window.localStorage.getItem("selectedModel") || "gpt-4o";

    setDefaultValue(savedValue);
  }, []);
  useEffect(() => {
    if (loading) {
      console.log("Loading state is true");
    }
  }, [loading]);

  async function handleSubmit() {
    if (!message) return;
    setLoading(true);
    action(message, true);

    // Create the chat session once
    const chatSession = await createNewChatSession(message, defaultValue);

    if (!chatSession) {
      setLoading(false);
      console.error("Failed to create a new chat session.");

      return;
    }

    // Exponential backoff parameters
    const initialInterval = 2000;
    const maxInterval = 16000;
    let currentInterval = initialInterval;
    const maxAttempts = 10;
    let attempts = 0;

    const pollForUpdates = async () => {
      attempts++;
      const data = await getConversation(chatSession.id);

      if (data && data.messages && data.messages.length > 0) {
        const latestMessage = data.messages[data.messages.length - 1];

        if (latestMessage.answer) {
          action(latestMessage.answer, false);
          setLoading(false);

          return;
        }
      }

      if (attempts < maxAttempts) {
        setTimeout(pollForUpdates, currentInterval);
        currentInterval = Math.min(currentInterval * 2, maxInterval);
      } else {
        setLoading(false);
        console.error("Failed to fetch the latest message from the database.");
      }
    };

    pollForUpdates();
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
          disabled={loading}
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
