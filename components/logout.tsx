import { signOut } from "next-auth/react";

import { LogOutIcon } from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import { checkEnvironment } from "@/lib/utils";

export default function Logout() {
  return (
    <>
      <Button
        className="text-base"
        variant="link"
        onClick={() =>
          signOut({ callbackUrl: checkEnvironment(), redirect: true })
        }
      >
        <span className="hidden text-sm lg:block">Logout </span>
        <LogOutIcon className="h-3 w-3" />
      </Button>
    </>
  );
}
