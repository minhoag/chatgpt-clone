"use client";

import { Input } from "@/components/ui/input";

export default function ChatInput() {
  async function handleSubmit(formData: FormData) {
    const message = formData.get("message") as string;
    if (!message) return;
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-row items-center gap-2 sm:pr-5"
    >
      <Input
        autoComplete="off"
        name="message"
        placeholder="Ask me something..."
        className="h-12"
      />
    </form>
  );
}
