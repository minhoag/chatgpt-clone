import Link from "next/link";
import {LogoChatGPT} from "./logo";
import { buttonVariants } from "@/components/ui/button";
import ToggleTheme from "./toggle";

export default function Navigation() {
  return (
    <nav className="w-full flex flex-row items-center justify-between h-24 mb-7 top-0 sticky bg-background">
      <LogoChatGPT />
      <div className="flex flex-row items-center">
        <ToggleTheme />
        <Link
          href="/login"
          className={buttonVariants({
            variant: "link",
            className: "text-base sm:ml-3",
            size: "sm",
          })}
        >
          Login
        </Link>
        <Link
          href="#"
          className={buttonVariants({
            variant: "link",
            className: "text-base",
            size: "sm",
          })}
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
