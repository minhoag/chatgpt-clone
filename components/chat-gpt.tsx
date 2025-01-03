import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import React from "react";

import { ChatGPTAvatar } from "@/components/icon/icon-gpt";
import Code from "@/components/code";

type ChatBubbleProps = {
  id?: string;
  answer: string;
};

export default function ChatBubbleGPT({ id, answer }: ChatBubbleProps) {
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
                        {answer}
                      </ReactMarkdown>
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
