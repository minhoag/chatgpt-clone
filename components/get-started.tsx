import Link from "next/link";
import { redirect } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { ArrowChatGPT } from "@/components/icon/icon";
import { getUser } from "@/lib/auth";
import { getUserFromDb } from "@/lib/utils";

export default async function GetStartedButton() {
  const session = await getUser();

  if (!session?.user) {
    redirect("/login");
  }
  const user = await getUserFromDb(session.user.email);

  if (!user) {
    redirect("/register");
  }
  const conversations = user.conversations;

  if (conversations.length === 0) return redirect("/chat");
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
