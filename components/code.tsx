"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

type CodeProps = {
  language: string;
  content: any;
};

export default function Code({ language, content }: CodeProps) {
  return (
    <div className="contain-inline-size rounded-md border-[0.5px] relative bg-token-sidebar-surface-primary dark:bg-gray-950">
      <div className="flex items-center text-background px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 dark:bg-[#2f2f2f] select-none">
        {language}
      </div>
      <div className="overflow-y-auto p-4 bg-[#f9f9f9] dark:bg-black" dir="ltr">
        <SyntaxHighlighter
          customStyle={{
            backgroundColor: "transparent",
            padding: 0,
            margin: 0,
          }}
          language={language}
          style={stackoverflowDark}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
