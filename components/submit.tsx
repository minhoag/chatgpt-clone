"use client";

import { useFormStatus } from "react-dom";
import { Loader2Icon, SendHorizonalIcon } from "lucide-react";

import { Button } from "./ui/button";

export default function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button className="h-12 w-12" size="icon" type="submit" variant="secondary">
      {pending ? (
        <Loader2Icon className="w-5 h-5 animate-spin" />
      ) : (
        <SendHorizonalIcon className="w-5 h-5" />
      )}
    </Button>
  );
}
