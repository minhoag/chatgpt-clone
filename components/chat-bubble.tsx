import React from "react";

import ChatGPTBubble from "@/components/chat-gpt";

interface ChatBubbleProps {
  id: string;
  question: string;
  answer: string;
  generate: boolean;
}

export function ChatBubble({
  id,
  question,
  answer,
  generate,
}: ChatBubbleProps) {
  if (!question) return <ChatGPTBubble answer={answer} generate={generate} />;

  return (
    <>
      <article
        key={id + "Q"}
        className="flex w-max max-w-[75%] text-primary-foreground break-words rounded-lg px-3 py-2 text-xs ml-auto bg-primary md:text-base"
      >
        {question}
      </article>
      <ChatGPTBubble answer={answer} generate={generate} id={id} />
    </>
  );
}
