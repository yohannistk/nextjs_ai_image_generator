"use client";

import React from "react";
import Link from "next/link";
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { sideBarData } from "@/data";
import { cn } from "@/lib/utils";
const Aside = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden border-r fixed w-64 top-0 bottom-0 bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {sideBarData.map((sidebar) => {
              const isActive = pathname.startsWith(sidebar.href);
              return (
                <Link
                  key={sidebar.href}
                  href={sidebar.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    {
                      "text-primary": isActive,
                      "bg-muted": isActive,
                    }
                  )}
                >
                  <sidebar.icon className="h-4 w-4" />
                  {sidebar.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
