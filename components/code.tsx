"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";
import {
  stackoverflowDark,
  stackoverflowLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
type CodeProps = {
  language: string;
  content: any;
};
const SyntaxHighlighter =
  Prism as typeof React.Component<SyntaxHighlighterProps>;

export default function Code({ language, content }: CodeProps) {
  const theme = useTheme();
  const codeTheme =
    theme.theme === "dark" ? stackoverflowDark : stackoverflowLight;

  return (
    <div className="contain-inline-size rounded-md border-[0.5px] relative">
      <div
        className={`flex items-center bg-code text-code-foreground px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 select-none`}
      >
        {language}
      </div>
      <div
        className={`overflow-y-auto bg-code text-code-foreground dark:bg-black p-4`}
        dir="ltr"
      >
        <SyntaxHighlighter
          customStyle={{
            background: "transparent!important",
            padding: 0,
            margin: 0,
          }}
          language={language}
          style={codeTheme}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
