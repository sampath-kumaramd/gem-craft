import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { FileBarChart2, Plus } from "lucide-react";
import { HiOutlineSupport } from "react-icons/hi";
import { BsCheck2Square } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { LuFlag } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { Separator } from "./ui/separator";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  // const params = useParams();

  const routes = [
    {
      href: "/category-data",
      label: "Category",
      active: pathname === "/category-data",
      icon: FileBarChart2,
    },
    // {
    //   href: "/users",
    //   label: "Users",
    //   active: pathname === "/users",
    //   icon: FiUsers,
    // },
  ];

  const router = useRouter();
  return (
    <div className={cn("pb-12 ", className)}>
      <div className="space-y-4 py-4 ">
        <div className="px-3 py-2">
          <div className="flex  align-middle mb-2">
            <div className="space-y-2">
              <UserButton />
            </div>{" "}
            <div className=" h2  px-4 text-lg font-semibold tracking-tight items-center flex align-middle">
              Gem Caft
            </div>
          </div>

          <Button className="my-3 w-full space-y-6"  onClick={() => router.push('/design-board')}>
            <Plus className="mr-2 h-4 w-4" />
            Create design
          </Button>
          <Separator />

          <div className="grid h-screen grid-cols-1 content-stretch ">
            <div className="bottom-0 mb-5">
              {routes.map((route) => (
                <Button
                  onClick={() => router.push(route.href)}
                  key={route.href}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <route.icon className="m-3" />
                  {route.label}
                </Button>
              ))}
              <Button variant="ghost" className="w-full justify-start">
                <HiOutlineSupport className="m-3" />
                Support
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <CiSettings className="m-3" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
