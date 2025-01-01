"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/icon/icon";

type InputLoadingProps = {
  text: string;
};

export default function InputLoading({ text }: InputLoadingProps) {
  return (
    <form className="flex flex-col items-center gap-2 sm:pr-5">
      <div className="flex w-full items-center space-x-2">
        <Input
          autoComplete="off"
          className="text-sm"
          disabled={true}
          name="message"
          placeholder={text}
        />
        <Button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9"
          disabled={true}
          type="submit"
        >
          <LoadingSpinner className={"h-5 w-5"} />
        </Button>
      </div>
    </form>
  );
}
