import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="pt-6">
      <div className="flex flex-row items-end gap-2 my-2">
        <div className="text-2xl font-semibold">404</div>
        <div>Not found</div>
      </div>
      <Link
        aria-label="Redirect to Homepage"
        className={buttonVariants()}
        href="/"
      >
        Back to homepage
      </Link>
    </div>
  );
}
