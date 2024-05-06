import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
