"use client";

import { useMemo } from "react";

import InputLoading from "@/app/chat/input-loading";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatSkeleton() {
  const skeletons = useMemo(
    () => (
      <>
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
      </>
    ),
    [],
  );

  return (
    <div className="relative">
      <div className="max-w-sm mx-auto flex flex-col gap-12 min-h-[80vh] md:max-w-2xl">
        {skeletons}
      </div>
      <div className="relative flex items-center justify-center">
        <div className="fixed mb-8 w-[90%] pl-4 pt-4 pb-2 bottom-0 bg-chat rounded-3xl text-center md:w-1/2 md:mb-4">
          <InputLoading text="Loading chat session..." />
          <span className="absolute bottom-3 left-[25%] text-xs text-foreground hidden md:block">
            ChatGPT can make mistakes. Check important info.
          </span>
        </div>
      </div>
    </div>
  );
}
