import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function Login() {
  return (
    <>
      <Link
        className={buttonVariants({
          variant: "link",
          className: "text-base sm:ml-3",
          size: "sm",
        })}
        href="/login"
      >
        Login
      </Link>
      <Link
        className={buttonVariants({
          variant: "link",
          className: "text-base",
          size: "sm",
        })}
        href="/register"
      >
        Register
      </Link>
    </>
  );
}
