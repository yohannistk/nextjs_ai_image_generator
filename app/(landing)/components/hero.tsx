"use client";
import { ArrowRight } from "lucide-react";
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="my-8">
      <div className="mx-auto px-4 py-8 lg:py-16">
        <div className="mx-auto flex flex-col mb-10 items-center text-center">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Create Stunning Visuals with AI Power
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Turn your ideas into stunning visuals with our powerful AI tool. No
            artistic skills required.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary/35 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Get started
            <ArrowRight className="ml-3" />
          </Link>
        </div>
        <div className="mx-auto max-w-5xl rounded-2xl overflow-hidden">
          <video
            autoPlay
            loop
            src={
              "https://cdn2.imagine.art/imagine-frontend/assets/video/ImagineWeb_New.mp4"
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
