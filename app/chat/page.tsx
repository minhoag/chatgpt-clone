"use client";

import { useState } from "react";

import { ChatBubble } from "@/components/chat-bubble";

import ChatInput from "./input";

interface ChatResponse {
  result: {
    role: string;
    content: string | undefined;
    refusal: string | null;
  };
  status: number;
}
async function getResponse(message: string) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data: ChatResponse = await response.json();

    return data.result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isUser: false },
  ]);

  const handleSendMessage = async (message: string) => {
    setMessages([...messages, { text: message, isUser: true }]);
    try {
      const data = await getResponse(message);

      if (!data || !data.content) {
        return setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "There is something wrong when requesting for response.",
            isUser: false,
          },
        ]);
      }
      if (data.content) {
        return setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.content ?? "No content available", isUser: false },
        ]);
      }
    } catch (error: any) {
      return setMessages((prevMessages) => [
        ...prevMessages,
        { text: error.message, isUser: false },
      ]);
    }
  };

  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto flex flex-col mb-20">
        <div className="flex-grow pr-8 overflow-y-auto">
          {messages.map((msg, index) => (
            <ChatBubble key={index} isUser={msg.isUser} message={msg.text} />
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
