import { PanelLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { getUser } from "@/lib/auth";
import db from "@/lib/prisma";

import { buttonVariants } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export default function ChatSession() {
  return (
    <Sheet>
      <VisuallyHidden.Root>
        <SheetTitle>Session</SheetTitle>
      </VisuallyHidden.Root>
      <SheetTrigger>
        <div className="flex flex-row items-center gap-2">
          <PanelLeftIcon className="w-5 h-5 mt-1" />
          <span className="mt-1 sm:hidden flex">Menu</span>
        </div>
      </SheetTrigger>
      <SheetContent className="min-w-[390px] px-0" side="left">
        <div>
          <h3 className="px-7 text-xl font-semibold">Conversations</h3>
          <Suspense
            fallback={
              <p className={buttonVariants({ variant: "link" })}>Loading...</p>
            }
          >
            <ConversationList />
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
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
    <ScrollArea className="flex flex-col mt-7 items-start overflow-y-auto h-[90vh] pb-5">
      {conversations.map((cn: any) => (
        <SheetClose key={cn.id} asChild>
          <Link
            className="w-full my-3 px-8 hover:underline underline-offset-2"
            href={`/chat/${cn.id}`}
          >
            {cn.name.length > 35 ? cn.name.slice(0, 35) + "..." : cn.name}
          </Link>
        </SheetClose>
      ))}
    </ScrollArea>
  );
}
