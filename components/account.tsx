import {
  CreditCardIcon,
  HelpCircleIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";

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
  const shortName = getInitials(name);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage alt="test" src={avatar} />
            <AvatarFallback className="rounded-lg">{shortName}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <div className="max-w-xs">
          <DropdownMenuContent
            align="end"
            className="py-2 max-h-[var(--radix-dropdown-menu-content-available-height)] bg-white dark:bg-[#2f2f2f] overflow-y-auto rounded-lg min-w-fit"
            side={"bottom"}
            sideOffset={4}
          >
            <div
              className="flex items-center m-1.5 p-2.5 text-sm"
              data-orientation="vertical"
              data-radix-collection-item=""
              role="menuitem"
            >
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
                  <CreditCardIcon />
                  Upgrade Plan
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div
                  className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-[#424242] dark:focus-visible:bg-[#424242] rounded-md my-0 dark:radix-state-open:bg-[#424242] gap-2.5 py-3"
                  data-orientation="vertical"
                  data-radix-collection-item=""
                  role="menuitem"
                >
                  <HelpCircleIcon />
                  Help
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div
                  className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-[#424242] dark:focus-visible:bg-[#424242] rounded-md my-0 dark:radix-state-open:bg-[#424242] gap-2.5 py-3"
                  data-orientation="vertical"
                  data-radix-collection-item=""
                  role="menuitem"
                >
                  <SettingsIcon />
                  Settings
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="mx-5 my-1 h-px bg-[#FFFFFF1A]" />
            <DropdownMenuItem asChild>
              <div
                className="flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-[#424242] dark:focus-visible:bg-[#424242] rounded-md my-0 dark:radix-state-open:bg-[#424242] gap-2.5 py-3"
                data-orientation="vertical"
                data-radix-collection-item=""
                role="menuitem"
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
