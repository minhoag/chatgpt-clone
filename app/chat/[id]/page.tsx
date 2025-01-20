"use client";

import { useParams } from "next/navigation";
import {
  ElementRef,
  startTransition,
  useCallback,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";

import { Model, requestOpenAi } from "@/app/chat/action";
import ChatSkeleton from "@/app/chat/chat-skeleton";
import ChatInput from "@/app/chat/input";
import InputLoading from "@/app/chat/input-loading";
import { ChatBubble } from "@/components/chat-bubble";
import {
  Conversation,
  isChatHistoryDifferent,
  saveChatHistory,
} from "@/lib/utils";

export default function ChatWindowProps() {
  /**
   * Create chat window for a specific conversation.
   * @logic:
   * - Users can send messages to already created conversations fetching from
   *   database.
   * - Messages are optimistically rendered while waiting for a response
   *   from the server using `useOptimistic` hook.
   * - When a message is sent, it is added to [messages] and [optimisticMessages].
   *   If the message is successfully sent, the message is removed from
   *   [optimisticMessages] and added to [messages] state.
   *
   * @returns {JSX.Element} Chat window for a specific conversation.
   */
  const scrollRef = useRef<ElementRef<"div">>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Conversation[]>([]);
  const [optimisticMessages, setOptimisticMessages] = useOptimistic(messages);
  const [waiting, setWaiting] = useOptimistic(false);

  // Fetch conversation messages from the server.
  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();
    const signal = controller.signal;

    // Params `id` is from the URL: https://{baseUrl}/chat/{id}
    fetch(`/api/chat?id=${id}`, { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          if (isChatHistoryDifferent(id, data.conversations.messages)) {
            setMessages(data.conversations.messages);
            saveChatHistory(id, data.conversations.messages);
          } else {
            const storedMessages = localStorage.getItem(id);

            if (storedMessages) {
              setMessages(JSON.parse(storedMessages));
            }
          }
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

  const handleSendMessage = useCallback(
    async (message: string): Promise<void> => {
      const messageId = Date.now().toString();

      startTransition(() => {
        setWaiting(true);
      });

      startTransition(() => {
        setOptimisticMessages((prevMessages) => [
          ...prevMessages,
          {
            messageId,
            question: message,
            answer: "Bot is thinking...",
            generate: false,
          },
        ]);
      });

      try {
        const model = getModel();
        const data: string = await requestOpenAi(model, id, {
          conversationId: id,
          messageId: messageId,
          question: message,
        });

        startTransition(() => {
          setOptimisticMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.messageId === messageId
                ? { ...msg, answer: data, generate: true }
                : msg,
            ),
          );
          setMessages((prevMessages) => [
            ...prevMessages,
            { messageId, question: message, answer: data, generate: false },
          ]);
        });
      } catch (error: any) {
        console.error(error);
      } finally {
        startTransition(() => {
          setWaiting(false);
        });
      }
    },
    [id, setMessages, setOptimisticMessages, setWaiting],
  );

  if (loading) return <ChatSkeleton />;

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto flex flex-col mb-36 md:pr-12">
        <div className="flex-grow px-4 overflow-y-auto">
          {optimisticMessages.map((msg: Conversation, index: number) => (
            <ChatBubble
              key={index}
              answer={msg.answer}
              generate={msg.generate}
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

function getModel() {
  return window.localStorage.getItem("selectedModel") as Model;
}
