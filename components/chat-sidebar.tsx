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
  SidebarGroupAction,
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
          <SidebarGroupAction title="Add Project">
            <Link href="/chat">
              <Plus className="w-4 h-4" />
            </Link>
            <span className="sr-only">New Chat</span>
          </SidebarGroupAction>
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
