"use client";

import { CreditCardIcon, HelpCircleIcon, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

import { AccountSetting } from "@/components/account-setting";
import { LoadingSpinner } from "@/components/icon/icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AccountProps {
  name: string;
  avatar?: string;
}

function getInitials(name: string): string {
  const nameParts = name.trim().split(" ");

  if (nameParts.length < 2) {
    throw new Error("Name must include at least a first name and a last name");
  }
  const firstNameInitial = nameParts[0][0];
  const lastNameInitial = nameParts[nameParts.length - 1][0];

  return `${firstNameInitial}${lastNameInitial}`;
}

export default function Account({ name, avatar }: AccountProps) {
  const [loading, setLoading] = useState(false);
  const shortName = getInitials(name);

  async function upgradePlan() {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/upgrade`);
    const data = await res.json();

    setLoading(false);

    if (data.error) return toast.error(data.error);

    return toast.success(data.message);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage alt="test" src={avatar} />
            <AvatarFallback className="rounded-lg">{shortName}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <div className="max-w-screen-sm">
          <DropdownMenuContent
            align="end"
            className="w-48 py-2 max-h-[var(--radix-dropdown-menu-content-available-height)] bg-white dark:bg-[#2f2f2f] overflow-y-auto rounded-lg min-w-full"
            side={"bottom"}
            sideOffset={4}
          >
            <div className="flex items-center m-1.5 p-2.5 text-sm">
              Hi, {name}
            </div>
            <DropdownMenuSeparator className="mx-5 my-1 h-px bg-[#FFFFFF1A]" />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <div
                  className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-[#424242] dark:focus-visible:bg-[#424242] rounded-md my-0 dark:radix-state-open:bg-[#424242] gap-2.5 py-3"
                  data-orientation="vertical"
                  data-radix-collection-item=""
                  role="menuitem"
                >
                  <button
                    className="flex flex-row gap-2 items-center"
                    disabled={loading}
                    onClick={upgradePlan}
                  >
                    <CreditCardIcon />
                    Upgrade Plan{" "}
                    {loading && <LoadingSpinner className="w-4 h-4" />}
                  </button>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div
                  className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-[#424242] dark:focus-visible:bg-[#424242] rounded-md my-0 dark:radix-state-open:bg-[#424242] gap-2.5 py-3"
                  data-orientation="vertical"
                  data-radix-collection-item=""
                  role="menuitem"
                >
                  <button className="flex flex-row gap-2 items-center">
                    <HelpCircleIcon />
                    Help
                  </button>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <AccountSetting />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="mx-5 my-1 h-px bg-[#FFFFFF1A]" />
            <DropdownMenuItem asChild>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <div
                className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-[#424242] dark:focus-visible:bg-[#424242] rounded-md my-0 dark:radix-state-open:bg-[#424242] gap-2.5 py-3"
                data-orientation="vertical"
                role="button"
                tabIndex={-1}
                onClick={() => signOut()}
              >
                <LogOutIcon className="w-4 h-4" /> Logout
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </>
  );
}
