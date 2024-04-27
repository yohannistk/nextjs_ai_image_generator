import React, { PropsWithChildren } from "react";
import Header from "@/components/header";
import Aside from "@/components/aside";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" min-h-screen w-full">
      <Aside />
      <div className="flex flex-col md:pl-64">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
