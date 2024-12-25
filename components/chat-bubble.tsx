import {
    Avatar, AvatarImage, AvatarFallback
} from '@/components/ui/avatar'

interface ChatBubbleProps {
    message: string;
    isUser: boolean;
}

export function ChatBubble({ message, isUser }: ChatBubbleProps) {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mx-auto my-6 flex flex-1 gap-4 text-base overflow-hidden md:gap-5 lg:gap-6 md:max-w-3xl`}>
            {!isUser && (
                <Avatar className="mr-2" style={{zIndex:-1}}>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>Bot</AvatarFallback>
                </Avatar>
            )}
            <div
                className={`${isUser ? 'max-w-xs text-base rounded-3xl px-5 py-2.5 bg-primary text-white dark:bg-white dark:text-black' : 'max-w-xl flex w-full flex-col gap-1 empty:hidden first:pt-[3px]'}`}>
                {message}
            </div>
        </div>
    );
}