"use client";

import {
  ElementRef,
  startTransition,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";
import { useParams } from "next/navigation";

import { ChatBubble } from "@/components/chat-bubble";
import ChatInput from "@/app/chat/input";
import { requestOpenAi } from "@/app/chat/action";
import ChatLoading from "@/app/chat/loading";
import LoadingChat from "@/app/chat/loading-chat";

type Conversation = {
  messageId: string;
  question: string;
  answer: string;
};

export default function ChatWindowProps() {
  const scrollRef = useRef<ElementRef<"div">>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Conversation[]>([]);
  const [optimisticMessages, setOptimisticMessages] = useOptimistic(messages);
  const [waiting, setWaiting] = useOptimistic(false);

  useEffect(() => {
    fetch(`/api/chat?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.conversations.messages);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    console.log(waiting);
  }, [waiting]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [optimisticMessages]);

  const handleSendMessage = async (message: string): Promise<void> => {
    const messageId = Date.now().toString();

    startTransition(() => {
      setWaiting(true);
    });

    startTransition(() => {
      setOptimisticMessages((prevMessages) => [
        ...prevMessages,
        { messageId, question: message, answer: "Bot is thinking..." },
      ]);
    });

    try {
      const data: string = await requestOpenAi({
        conversationId: id,
        messageId: messageId,
        question: message,
      });

      startTransition(() => {
        setOptimisticMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.messageId === messageId ? { ...msg, answer: data } : msg,
          ),
        );
        setMessages((prevMessages) => [
          ...prevMessages,
          { messageId, question: message, answer: data },
        ]);
      });
    } catch (error: any) {
      console.error(error);
    } finally {
      startTransition(() => {
        setWaiting(false);
      });
    }
  };

  if (loading) return <ChatLoading />;

  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto flex flex-col mb-28">
        <div className="flex-grow px-4 overflow-y-auto">
          {optimisticMessages.map((msg: Conversation, index: number) => (
            <ChatBubble
              key={index}
              answer={msg.answer}
              id={msg.messageId}
              question={msg.question}
            />
          ))}
          <div ref={scrollRef} />
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="fixed mb-8 w-[90%] px-4 py-4 bottom-0 bg-chat rounded-xl text-center md:w-1/2 md:mb-4 md:pt-8 md:pb-3 md:pl-8 md:pr-4">
          {waiting ? (
            <LoadingChat text="Message ChatGPT..." />
          ) : (
            <ChatInput sendMessage={handleSendMessage} />
          )}
          <span className="relative text-xs top-1 text-foreground hidden md:block md:py-1">
            ChatGPT can make mistakes. Check important info.
          </span>
        </div>
      </div>
    </div>
  );
}
