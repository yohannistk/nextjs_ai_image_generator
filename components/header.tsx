"use client";

import React from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import {
  CircleUser,
  Home,
  LineChart,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { UserButton } from "@clerk/nextjs";
import { sideBarData } from "@/data";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { UserLimit } from "@prisma/client";

interface Props {
  userLimit: UserLimit;
}
const Header = (props: Props) => {
  const pathname = usePathname();

  return (
    <header className="flex z-50 sticky top-0 bg-background justify-between h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {sideBarData.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground",
                    {
                      isActive: "bg-muted text-primary",
                    }
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                  {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge> */}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="ml-auto">
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
};

export default Header;
