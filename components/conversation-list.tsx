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
    <SidebarMenu className="mt-4">
      {conversations.map((cn: any) => (
        <SidebarMenuItem
          key={cn.id}
          className="flex items-center no-draggable group rounded-lg active:opacity-90 bg-transparent hover:bg-[#fff] dark:hover:bg-[#212121] h-9 text-sm relative"
        >
          <SidebarMenuButton
            asChild
            className="active:bg-transparent active:text-sidebar-accent-foreground"
          >
            <Link
              className="w-full -ml-5 px-8 hover:bg-transparent underline-offset-2"
              href={`/chat/${cn.id}`}
            >
              {cn.name.length > 35 ? cn.name.slice(0, 35) + "..." : cn.name}
            </Link>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:bg-none">
              <Button
                className="flex items-center justify-center ring-0 text-[#b4b4b4] transition hover:bg-transparent hover:text-[#b4b4b4] radix-state-open:text-[#b4b4b4] dark:text-[#b4b4b4] dark:hover:text-[#b4b4b4] dark:radix-state-open:text-[#b4b4b4]"
                size="icon"
                variant="ghost"
              >
                <div className="hover:text-[#424242] dark:hover:text-white">
                  <Ellipsis size={24} />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 max-w-xs bg-[#f5f5f5] dark:bg-[#424242] -mt-3 ml-20 rounded-2xl popover shadow-lg border overflow-hidden px-1 py-2">
              <VisuallyHidden.Root>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
              </VisuallyHidden.Root>
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-[#5d5d5d] dark:focus-visible:bg-[#5d5d5d] rounded-md dark:radix-state-open:bg-[#5d5d5d]">
                  <div className="flex items-center justify-center h-5 w-5">
                    <Share />
                  </div>
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-[#5d5d5d] rounded-md my-0 px-3 mx-2 gap-2.5 py-3 text-error"
                  onClick={() => handleDelete(cn.id)}
                >
                  <div className="flex items-center justify-center h-5 w-5">
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
