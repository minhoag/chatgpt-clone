"use client";

import { useState } from "react";
import ChatInput from "./input";
import { ChatBubble } from "@/components/chat-bubble";

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isUser: false },
  ]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { text: message, isUser: true }]);
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text:
            "This is a response from ChatGPT. Lorem ipsum dolor sit amet, " +
            "consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut " +
            "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud " +
            "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
            "eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt " +
            "in culpa qui officia deserunt mollit anim id est laborum.",
          isUser: false,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-grow overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <div className="mt-5 bottom-0 sticky pb-8 pt-1 bg-background">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
