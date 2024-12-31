"use client";

import { ChatBubble } from "@/components/chat-bubble";
import NewChatInput from "@/app/chat/new-input";

export default function NewChat() {
  const id = Date.now().toString();

  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto flex flex-col mb-28">
        <div className="flex-grow px-4 overflow-y-auto">
          <ChatBubble
            answer={"Hello, how can I help you today?"}
            id={id}
            question={""}
          />
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="fixed mb-4 w-4/5 bottom-0 bg-chat pt-8 pb-3 px-8 rounded-xl text-center md:w-1/2">
          <NewChatInput />
          <span className="relative text-xs top-1 text-foreground">
            ChatGPT can make mistakes. Check important info.
          </span>
        </div>
      </div>
    </div>
  );
}
