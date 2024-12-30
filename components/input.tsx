"use client";

import Submit from "@/components/submit";
import { Input } from "@/components/ui/input";

export default function IndexInput() {
  return (
    <form className="flex flex-row items-center gap-2 sm:pr-5">
      <Input
        autoComplete="off"
        className="h-12"
        name="message"
        placeholder="Ask me something..."
      />
      <Submit />
    </form>
  );
}
