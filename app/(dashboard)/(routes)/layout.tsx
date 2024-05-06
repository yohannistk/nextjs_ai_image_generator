import React, { PropsWithChildren, useEffect } from "react";
import Header from "@/components/header";
import Aside from "@/components/aside";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserTest from "@/app/(landing)/components/test";
import { createClient } from "@/utils/supabase/server";

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const { userId, getToken } = auth();
  const token = await getToken({ template: "supabase" });
  const supabase = createClient(token!);
  let { data: userLimit, error } = await supabase
    .from("UserLimit")
    .select("*")
    .eq("user_id", userId as string)
    .single();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className=" min-h-screen w-full">
      <UserTest />
      <Aside userLimit={userLimit!} />
      <div className="flex flex-col md:pl-64">
        <Header userLimit={userLimit!} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
