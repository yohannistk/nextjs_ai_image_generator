import { auth } from "@clerk/nextjs/server";
import Header from "./components/header";
import Hero from "./components/hero";
import { redirect } from "next/navigation";
import Fotter from "./components/footer";
export default function Home() {
  const { userId } = auth();
  if (userId) {
    redirect("/generate");
  }
  return (
    <main className="">
      <Header />
      <Hero />
      <Fotter />
    </main>
  );
}
