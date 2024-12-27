import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

export function ChatBubble({ message, isUser }: ChatBubbleProps) {
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mx-auto my-6 flex flex-1 gap-4 text-base overflow-hidden md:gap-5 lg:gap-6 md:max-w-3xl`}
    >
      {!isUser && (
        <Avatar className="mr-2" style={{ zIndex: -1 }}>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>Bot</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${isUser ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}
      >
        {message}
      </div>
    </div>
  );
}
