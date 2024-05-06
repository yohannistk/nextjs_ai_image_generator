import { auth } from "@clerk/nextjs/server";
import Header from "./components/header";
import Hero from "./components/hero";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();
  if (userId) {
    redirect("/generate");
  }
  return (
    <main className="">
      {/* <UserTest /> */}
      <Header />
      <Hero />
    </main>
  );
}
