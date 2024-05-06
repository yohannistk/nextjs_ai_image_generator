"use client";

import { ArrowBigRight, ArrowRight } from "lucide-react";
import React from "react";
import { HeroCarousel } from "./hero-carousel";

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-6xl mx-auto px-4 py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Create Stunning Visuals with AI Power
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Turn your ideas into stunning visuals with our powerful AI tool. No
            artistic skills required.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary/35 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Get started
            <ArrowRight className="ml-3" />
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          {/* <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
          /> */}
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
};

export default Hero;
