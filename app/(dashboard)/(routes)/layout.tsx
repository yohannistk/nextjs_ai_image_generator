import React, { PropsWithChildren, useEffect } from "react";
import Header from "@/components/header";
import Aside from "@/components/aside";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/db";

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const userLimit = await prisma.userLimit.findUnique({
    where: { user_id: userId! },
  });
  if (!userLimit) {
    redirect("/sign-in");
  }
  return (
    <div className="h-screen w-full">
      <Aside userLimit={userLimit!} />
      <div className="flex h-full flex-col md:pl-64">
        <Header userLimit={userLimit!} />
        <main className="flex flex-1 h-full flex-col">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
