import React from "react";

import ChatGPTBubble from "@/components/chat-gpt";

interface ChatBubbleProps {
  id: string;
  question: string;
  answer: string;
}

export function ChatBubble({ id, question, answer }: ChatBubbleProps) {
  if (!question) return <ChatGPTBubble answer={answer} />;

  return (
    <>
      <article
        key={id + "Q"}
        className="flex w-max max-w-[75%] markdown prose break-words dark:prose-invert rounded-lg px-3 py-2 text-xs ml-auto bg-primary text-primary-foreground md:text-base"
      >
        {question}
      </article>
      <ChatGPTBubble answer={answer} id={id} />
    </>
  );
}
