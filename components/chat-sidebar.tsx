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
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { getUser } from "@/lib/auth";
import db from "@/lib/prisma";

export default function ChatSidebar() {
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>History</SidebarGroupLabel>
          <SidebarGroupAction title="Add Project">
            <Link href="/chat">
              <Plus className="w-3 h-3" />
            </Link>
            <span className="sr-only">New Chat</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <ConversationList />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

async function ConversationList() {
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
    <SidebarMenu>
      {conversations.map((cn: any) => (
        <SidebarMenuItem key={cn.id}>
          <SidebarMenuButton asChild>
            <Link
              className="w-full my-3 px-8 hover:underline underline-offset-2"
              href={`/chat/${cn.id}`}
            >
              {cn.name.length > 35 ? cn.name.slice(0, 35) + "..." : cn.name}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
