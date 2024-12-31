import { Plus } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { getUser } from "@/lib/auth";
import db from "@/lib/prisma";
import ConversationList from "@/components/conversation-list";

export default async function ChatSidebar() {
  const session = await getUser();

  if (!session?.user) return null;
  const res = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      conversations: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!res) return null;
  const { conversations } = res;

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="ml-1">Chat History</SidebarGroupLabel>
          <div className="absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none">
            <Link className="bg-transparent w-full h-full" href="/chat">
              <Plus className="w-5 h-5" />
            </Link>
            <span className="sr-only">New Chat</span>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              <ConversationList initialConversations={conversations} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
