import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "@/components/icon/icon";

export default function Logout() {
  return (
    <>
      <Button
        className="text-base"
        variant="link"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <span className="hidden text-sm lg:block">Logout </span>
        <LogOutIcon className="h-3 w-3" />
      </Button>
    </>
  );
}
