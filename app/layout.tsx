import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import ProModalProvider from "@/providers/pro-modal-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Text-to-Image Magic",
  description:
    "Transform text into vibrant visual content with our online text-to-image tool! Generate eye-catching images effortlessly, perfect for social media, presentations, and more. Get started today and bring your words to life with stunning visuals!",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ProModalProvider />
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
