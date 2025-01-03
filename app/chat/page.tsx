"use client";

import { useState } from "react";

import { ChatBubble } from "@/components/chat-bubble";
import NewInput from "@/app/chat/new-input";

export default function Page() {
  const [messages, setMessages] = useState<
    { id: string; question: string; isThinking: boolean }[]
  >([]);
  const id = Date.now().toString();

  const handleNewMessage = (message: string, isThinking: boolean) => {
    setMessages([{ id: Date.now().toString(), question: message, isThinking }]);
  };

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto flex flex-col mb-28 md:pr-12">
        <div className="flex-grow px-4 overflow-y-auto">
          <ChatBubble
            answer={"Hello, how can I help you today?"}
            id={id}
            question={""}
          />
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              answer={msg.isThinking ? "Bot is thinking..." : ""}
              id={msg.id}
              question={msg.question}
            />
          ))}
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="fixed mb-8 w-[90%] pl-4 pt-4 pb-2 bottom-0 bg-chat rounded-3xl text-center md:w-1/2 md:mb-4">
          <NewInput action={handleNewMessage} />
          <span className="absolute bottom-3 left-[25%] text-xs text-foreground hidden md:block">
            ChatGPT can make mistakes. Check important info.
          </span>
        </div>
      </div>
    </div>
  );
}
