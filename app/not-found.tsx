import Link from "next/link";

import { ChatGPTAvatar } from "@/components/icon/icon-gpt";
import SparklesText from "@/components/ui/sparkles-text";

export default function NotFound() {
  return (
    <>
      <section
        className="flex h-screen flex-col items-center justify-center"
        data-index={5}
        id=":Rlj5:"
      >
        <div>
          <h3 className="font-bold text-xl">
            <ChatGPTAvatar className={"w-6 h-6 mb-2"} />
            404 Not Found
          </h3>
          <p className="mt-2 max-w-lg pb-8">
            <span className="whitespace-pre-wrap dark">
              <span>
                In the heat of day, The path dissolves to nothing— An empty
                mirage.{" "}
              </span>
            </span>
            <span className="whitespace-pre-wrap text-transparent" />
          </p>
          <Link href="/">
            <SparklesText text="Go back?" />
          </Link>
        </div>
      </section>
      <span className="pointer-events-none fixed inset-0 z-[60] mx-auto my-2 flex max-w-[560px] flex-col items-stretch justify-start md:pb-5" />
    </>
  );
}
