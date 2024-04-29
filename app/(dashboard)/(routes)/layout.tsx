import React, { PropsWithChildren } from "react";
import Header from "@/components/header";
import Aside from "@/components/aside";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const getUserLimit = async (userId: string) => {
  return await prisma.userLimit.findUnique({
    where: { userId },
  });
};

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const userLimit = await getUserLimit(userId);
  if (!userLimit) {
    redirect("/sign-in");
  }
  return (
    <div className=" min-h-screen w-full">
      <Aside userLimit={userLimit} />
      <div className="flex flex-col md:pl-64">
        <Header userLimit={userLimit} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
