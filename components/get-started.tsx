import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { ArrowChatGPT } from "@/components/icon/icon";
import { getUser } from "@/lib/auth";
import { getUserFromDb } from "@/lib/utils";

export default async function GetStartedButton() {
  const session = await getUser();

  if (!session?.user) return console.error("session not found.");
  const user = await getUserFromDb(session.user.email);

  if (!user) return console.error("user not found.");
  const conversations = user.conversations;

  if (conversations.length === 0)
    return console.error("conversation not found.");
  const firstConversation = conversations[0];

  return (
    <Link
      className={buttonVariants({ size: "lg" })}
      href={`/chat/${firstConversation.id}`}
    >
      Get started <ArrowChatGPT props="ml-2" />
    </Link>
  );
}
