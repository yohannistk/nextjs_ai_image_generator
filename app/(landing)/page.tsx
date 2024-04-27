import { Button, buttonVariants } from "@/components/ui/button";
import UserExample from "@/components/user";
import { UserProfile } from "@clerk/clerk-react";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
export default function Home() {
  return (
    <main className="">
      <Button>Click me</Button>
      <Link href={"/sign-in"} className={buttonVariants({})}>
        Sign in
      </Link>
      <Link href={"/sign-up"} className={buttonVariants({})}>
        Sign Up
      </Link>
      <UserExample />
    </main>
  );
}
