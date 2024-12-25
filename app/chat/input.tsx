import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button'

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  async function handleSubmit(formData: FormData) {
    const message = formData.get("message") as string;
    if (!message) return;
    onSendMessage(message);
  }

  return (
      <form
          action={handleSubmit}
          className="flex flex-row items-center gap-2 sm:pr-5"
      >
        <div className="flex w-full items-center space-x-2">
          <Input
              autoComplete="off"
              name="message"
              placeholder="Message ChatGPT..."
              className="h-12"
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
  );
}
