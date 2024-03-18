import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Plus } from "lucide-react";
// import { HiOutlineSupport } from "react-icons/hi";
// import { CiSettings } from "react-icons/ci";
import { Separator } from "./ui/separator";
import { UserButton } from "@clerk/nextjs";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 ", className)}>
      <div className="space-y-4 py-4 ">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <Button className="my-3 w-full space-y-6">
            <Plus className="mr-2 h-4 w-4" />
            Create project
          </Button>

          <div className="grid h-screen grid-cols-1 content-stretch ">
            <div className="bottom-0 mb-5">
              <Button variant="ghost" className="w-full justify-start">
                {/* <HiOutlineSupport className="m-3" /> */}
                Support
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                {/* <CiSettings className="m-3" /> */}
                Settings
              </Button>
              <Separator />
              <div className="mt-5 space-y-2">
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
