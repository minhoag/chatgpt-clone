"use client";

import { useState } from "react";
import { Trash, Ellipsis, Share } from "lucide-react";
import Link from "next/link";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { redirect } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { deleteChatSession } from "@/app/chat/action";
import { Button } from "@/components/ui/button";

export default function ConversationList({
  initialConversations,
}: {
  initialConversations: any[];
}) {
  const [conversations, setConversations] = useState(initialConversations);

  async function handleDelete(chatId: string) {
    await deleteChatSession(chatId);
    setConversations(conversations.filter((cn) => cn.id !== chatId));
    redirect("/chat");
  }

  return (
    <SidebarMenu>
      {conversations.map((cn: any) => (
        <SidebarMenuItem
          key={cn.id}
          className="flex justify-between items-center"
        >
          <SidebarMenuButton asChild>
            <Link
              className="w-full my-3 px-8 hover:underline underline-offset-2"
              href={`/chat/${cn.id}`}
            >
              {cn.name.length > 35 ? cn.name.slice(0, 35) + "..." : cn.name}
            </Link>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 max-w-xs -mt-4 ml-20 rounded-2xl popover shadow-lg radix-side-bottom:animate-slideUpAndFade radix-side-left:animate-slideRightAndFade radix-side-right:animate-slideLeftAndFade radix-side-top:animate-slideDownAndFade border border-token-border-light overflow-hidden px-1 py-2">
              <VisuallyHidden.Root>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
              </VisuallyHidden.Root>
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-[#424242] dark:focus-visible:bg-[#424242] rounded-md dark:radix-state-open:bg-[#424242]">
                  <div className="flex items-center justify-center h-5 w-5">
                    <Share />
                  </div>
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-[#424242] dark:focus-visible:bg-[#424242] rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-[#424242] gap-2.5 py-3 text-token-text-error"
                  onClick={() => handleDelete(cn.id)}
                >
                  <div className="flex items-center justify-center text-error h-5 w-5">
                    <Trash />
                  </div>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
