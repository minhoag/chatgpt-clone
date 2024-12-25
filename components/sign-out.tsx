import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function ButtonSignOut() {
  return (
    <Button
      variant="link"
      className="text-base"
      onClick={() => {
        signOut();
        localStorage.removeItem("apiKey");
      }}
    >
      Logout
    </Button>
  );
}
