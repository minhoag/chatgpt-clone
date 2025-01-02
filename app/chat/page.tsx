"use client";

import { ChatBubble } from "@/components/chat-bubble";
import NewChatInput from "@/app/chat/chat-new-input";

export default function Page() {
  const id = Date.now().toString();

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto flex flex-col mb-28 md:pr-12">
        <div className="flex-grow px-4 overflow-y-auto">
          <ChatBubble
            answer={"Hello, how can I help you today?"}
            id={id}
            question={""}
          />
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="fixed mb-8 w-[90%] px-4 py-4 bottom-0 bg-chat rounded-xl text-center md:w-1/2 md:mb-4 md:pt-8 md:pb-3 md:pl-8 md:pr-4">
          <NewChatInput />
          <span className="relative text-xs top-1 text-foreground hidden md:block md:py-1">
            ChatGPT can make mistakes. Check important info.
          </span>
        </div>
      </div>
    </div>
  );
}
