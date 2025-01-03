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
import ChatSkeleton from "@/app/chat/chat-skeleton";
import InputLoading from "@/app/chat/input-loading";

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
    let isMounted = true;

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`/api/chat?id=${id}`, { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setMessages(data.conversations.messages);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted && error.name !== "AbortError") {
          console.error(error);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);

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

  if (loading) return <ChatSkeleton />;

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto flex flex-col mb-28 md:pr-12">
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
        <div className="fixed mb-8 w-[90%] pl-4 pt-4 pb-2 bottom-0 bg-chat rounded-3xl text-center md:w-1/2 md:mb-4">
          {waiting ? (
            <InputLoading text="Message ChatGPT..." />
          ) : (
            <ChatInput action={handleSendMessage} />
          )}
          <span className="absolute bottom-3 left-[25%] text-xs text-foreground hidden md:block">
            ChatGPT can make mistakes. Check important info.
          </span>
        </div>
      </div>
    </div>
  );
}
