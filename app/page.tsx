import { buttonVariants } from "@/components/ui/button";
import {ArrowChatGPT} from '@/components/icon/icon'
import Link from "next/link";

export default function Home() {
  return (
      <div className="flex flex-col items-center gap-5 justify-center h-[70vh]">
          <h1 className="text-4xl font-bold text-center">
              Introducing ChatGPT
          </h1>
          <Link href="/app/login" className={buttonVariants({size: "lg"})}>
              Get started <ArrowChatGPT props="ml-2"/>
          </Link>
          <p className="sm:w-[75%] mx-auto text-center text-muted-foreground ">
              ChatGPT is a cutting-edge language model developed by OpenAI, designed to engage in natural,
              intelligent conversations with you. Whether you’re looking for quick answers, creative ideas,
              or in-depth explanations, ChatGPT is here to help. Powered by advanced AI, it understands your
              questions, responds with contextually relevant information, and can even adapt to your tone and style.
          </p>
      </div>
  );
}
