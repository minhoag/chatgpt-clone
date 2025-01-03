"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/icon/icon";
import { Textarea } from "@/components/ui/textarea";

type InputLoadingProps = {
  text: string;
};

export default function InputLoading({ text }: InputLoadingProps) {
  return (
    <form className="flex flex-row items-center gap-2">
      <div className="flex w-full cursor-text flex-col rounded-3xl px-2.5 py-1 transition-colors contain-inline-size bg-[#f4f4f4] dark:bg-[#2d2d2d]">
        <Textarea
          className="block h-10 w-full text-base border-0 bg-transparent p-0"
          name="message"
          placeholder={text}
        />
        <div className="flex" style={{ justifyContent: "flex-end" }}>
          <Button
            className="relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9"
            disabled={true}
            type="submit"
          >
            <LoadingSpinner className={"h-5 w-5"} />
          </Button>
        </div>
      </div>
    </form>
  );
}
