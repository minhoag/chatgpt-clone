"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { ChatBubble } from "@/components/chat-bubble";
import ChatInput from "@/app/chat/input";
import { requestOpenAi } from "@/app/chat/action";

type Conversation = {
  messageId: string;
  question: string;
  answer: string;
};

export default function ChatWindowProps() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Conversation[]>([]);

  useEffect(() => {
    fetch(`/api/chat?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.conversations.messages);
        setLoading(false);
      });
  }, []);

  const messageId = Date.now().toString();
  const handleSendMessage = async (message: string): Promise<void> => {
    try {
      const data: string = await requestOpenAi({
        conversationId: id,
        messageId: messageId,
        question: message,
      });

      return setMessages([
        ...messages,
        { messageId: Date.now().toString(), question: message, answer: data },
      ]);
    } catch (error: any) {
      return console.error("Error fetching response", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto flex flex-col mb-20">
        <div className="flex-grow pr-8 overflow-y-auto">
          {messages.map((msg: Conversation, index: number) => (
            <ChatBubble
              key={index}
              answer={msg.answer}
              id={msg.messageId}
              question={msg.question}
            />
          ))}
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="fixed w-2/3 mt-5 bottom-0 pb-8 pt-1 bg-background md:w-1/2">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
