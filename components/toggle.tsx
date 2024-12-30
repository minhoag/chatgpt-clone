"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function ToggleTheme() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {theme == "light" ? (
        <Button size="icon" variant="ghost" onClick={() => setTheme("dark")}>
          <MoonIcon className="w-5 h-5" />
        </Button>
      ) : (
        <Button size="icon" variant="ghost" onClick={() => setTheme("light")}>
          <SunIcon className="w-5 h-5" />
        </Button>
      )}
    </>
  );
}
