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

function onValueChange(value: string) {
  localStorage.setItem("selectedModel", value);
}

export function SelectModel() {
  const [defaultValue, setDefaultValue] = useState("gpt-4o");

  useEffect(() => {
    const savedValue = window.localStorage.getItem("selectedModel") || "gpt-4o";

    setDefaultValue(savedValue);
  }, []);

  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Model" />
      </SelectTrigger>
      <SelectContent className="bg-background border border-1 border-foreground">
        <SelectGroup>
          <SelectLabel>Model</SelectLabel>
          <SelectItem defaultChecked={defaultValue == "gpt-4o"} value="gpt-4o">
            gpt-4o
          </SelectItem>
          <SelectItem
            defaultChecked={defaultValue == "gpt-4o-mini"}
            value="gpt-4o-mini"
          >
            gpt-4o-mini
          </SelectItem>
          <SelectItem
            defaultChecked={defaultValue == "gpt-3.5-turbo-0125"}
            value="gpt-3.5-turbo-0125"
          >
            gpt-3.5-turbo-0125
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
