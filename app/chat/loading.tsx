"use client";

import { Skeleton } from "@/components/ui/skeleton";
import InputLoading from "@/app/chat/loading-chat";

export default function ChatLoading() {
  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto flex flex-col gap-12 min-h-[80vh]">
        <div className="flex flex-col gap-4">
          <Skeleton className="max-w-[700px] h-[40px] rounded-md" />
          <Skeleton className="w-[70%] h-[20px] rounded-md" />
          <Skeleton className="w-[30%] h-[20px] rounded-md" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="max-w-[700px] h-[40px] rounded-md" />
          <Skeleton className="w-[82%] h-[20px] rounded-md" />
          <Skeleton className="w-[45%] h-[20px] rounded-md" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="max-w-[700px] h-[40px] rounded-md" />
          <Skeleton className="w-[82%] h-[20px] rounded-md" />
          <Skeleton className="w-[45%] h-[20px] rounded-md" />
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="fixed mb-4 w-4/5 bottom-0 bg-chat pt-8 pb-3 px-8 rounded-xl text-center md:w-1/2">
          <InputLoading text="Creating new chat session..." />
          <span className="relative text-xs top-1 text-foreground">
            ChatGPT can make mistakes. Check important info.
          </span>
        </div>
      </div>
    </div>
  );
}
