import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { ArrowChatGPT } from "@/components/icon/icon";

export default async function GetStartedButton() {
  return (
    <Link className={buttonVariants({ size: "lg" })} href="/chat">
      Get started <ArrowChatGPT props="ml-2" />
    </Link>
  );
}
