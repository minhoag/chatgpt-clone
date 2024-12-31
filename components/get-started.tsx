import Link from "next/link";
import { getSession } from "next-auth/react";

import { buttonVariants } from "@/components/ui/button";
import { ArrowChatGPT } from "@/components/icon/icon";
import { checkEnvironment } from "@/lib/utils";

export default async function GetStartedButton() {
  const session = await getSession(handler);
  const url = session ? "/chat" : "/login";

  return (
    <Link
      className={buttonVariants({ size: "lg" })}
      href={checkEnvironment().concat(url)}
    >
      Get started <ArrowChatGPT props="ml-2" />
    </Link>
  );
}
