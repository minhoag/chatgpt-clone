"use client";

import { Skeleton } from "@/components/ui/skeleton";
import InputLoading from "@/app/chat/loading-chat";

export default function ChatLoading() {
  return (
    <div className="relative">
      <div className="max-w-xs mx-auto flex flex-col gap-12 min-h-[80vh] md:max-w-2xl">
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
        <div className="fixed mb-8 w-[90%] px-4 py-4 bottom-0 bg-chat rounded-xl text-center md:w-1/2 md:mb-4 md:pt-8 md:pb-3 md:pl-8 md:pr-4">
          <InputLoading text="Loading chat session..." />
          <span className="relative text-xs top-1 text-foreground hidden md:block md:py-1">
            ChatGPT can make mistakes. Check important info.
          </span>
        </div>
      </div>
    </div>
  );
}
