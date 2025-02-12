"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function ToggleTheme({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {theme == "light" ? (
        <Button
          className={className}
          size="icon"
          variant="ghost"
          onClick={() => setTheme("dark")}
        >
          <span className="sr-only">Dark Mode</span>
          <MoonIcon className="w-5 h-5" />
        </Button>
      ) : (
        <Button
          className={className}
          size="icon"
          variant="ghost"
          onClick={() => setTheme("light")}
        >
          <span className="sr-only">Light Mode</span>
          <SunIcon className="w-5 h-5" />
        </Button>
      )}
    </>
  );
}
