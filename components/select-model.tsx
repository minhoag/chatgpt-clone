"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectModel() {
  const [model, setModel] = useState((): string => {
    if (typeof window !== "undefined") {
      const from_localStorage = window.localStorage.getItem("selectedModel");

      return from_localStorage ? from_localStorage : "gpt-4o";
    }

    return "gpt-4o";
  });

  useEffect(() => {
    window.localStorage.setItem("selectedModel", model);
  }, [model]);

  return (
    <Select defaultValue={model} onValueChange={setModel}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Model" />
      </SelectTrigger>
      <SelectContent className="bg-background border border-1 border-foreground">
        <SelectGroup>
          <SelectLabel>Model</SelectLabel>
          <SelectItem value="gpt-4o">gpt-4o</SelectItem>
          <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
          <SelectItem value="gpt-3.5-turbo-0125">gpt-3.5-turbo-0125</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
