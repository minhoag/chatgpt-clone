import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";

import Code from "@/components/code";
import { ChatGPTAvatar } from "@/components/icon/icon-gpt";

type ChatBubbleProps = {
  id?: string;
  answer?: string;
  timeStamps: string;
};

const ThinkingAnimation = () => (
  <div className="flex items-center">
    <span>Bot is thinking</span>
    <div className="flex ml-1">
      {[...Array(3)].map((_, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -5, 0] }}
          className="ml-[.1rem], mr-[.1rem]"
          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
        >
          .
        </motion.span>
      ))}
    </div>
  </div>
);

export default function ChatBubbleGPT({
  id,
  answer = "",
  timeStamps,
}: ChatBubbleProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (answer === "Bot is thinking...") return;

    const now = new Date().getTime();
    const messageTime = new Date(Number(timeStamps)).getTime();
    const isRecent = now - messageTime < 15000;

    if (isRecent) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setDisplayedText(answer.slice(0, currentIndex));
        currentIndex++;
        if (currentIndex > answer.length) {
          clearInterval(interval);
        }
      }, 20);

      return () => clearInterval(interval);
    } else {
      setDisplayedText(answer);
    }
  }, [answer, timeStamps]);

  return (
    <article
      key={id + "A"}
      className="flex w-full focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
    >
      <h6 className="sr-only">ChatGPT said:</h6>
      <div className="w-full m-auto text-base px-3 sm:px-12 py-[18px] md:px-5">
        <div className="mx-auto flex flex-1 gap-4 md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
          <div className="flex-shrink-0 flex flex-col relative -ml-5 items-end md:ml-0 md:mt-2">
            <div className="pt-0">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                <div className="relative p-1 rounded-sm flex items-center justify-center h-8 w-8">
                  <ChatGPTAvatar className="icon-md" />
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex w-full min-w-0 flex-col">
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex max-w-full flex-col flex-grow">
                <div className="min-h-8 text-message flex w-full flex-col items-end gap-2 whitespace-normal break-words text-start">
                  <div className="flex w-full flex-col gap-1 empty:hidden first:pt-[3px]">
                    <div className="markdown prose w-full break-words dark:prose-invert">
                      {answer === "Bot is thinking..." ? (
                        <ThinkingAnimation />
                      ) : (
                        <ReactMarkdown
                          className="markdown-body text-sm lg:text-base"
                          components={{
                            code(props) {
                              const { children, className, ...rest } = props;
                              const match = /language-(\w+)/.exec(
                                className || "",
                              );

                              return match ? (
                                <Code content={children} language={match[1]} />
                              ) : (
                                <code {...rest} className={className}>
                                  {children}
                                </code>
                              );
                            },
                          }}
                          rehypePlugins={[rehypeKatex]}
                          remarkPlugins={[remarkGfm]}
                        >
                          {displayedText}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pr-2 lg:pr-0" />
              <div className="mt-3 w-full empty:hidden">
                <div className="text-center" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
