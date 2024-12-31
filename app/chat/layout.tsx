import { PropsWithChildren } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import ChatSidebar from "@/components/chat-sidebar";
import Navigation from "@/components/navigation";

export default function ChatLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <div className="flex sm:flex-row flex-col items-start sm:gap-12 gap-4 w-full">
        <div className="w-full">
          <Navigation enableSidebarTrigger={true} />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
