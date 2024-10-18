import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import HeroImage from "./HeroImage";
import AnimationContainer from "@/components/animation-container";

const Hero = () => {
  return (
    <div className="pb-6 md:pb-8">
      <div className="bg-neutral-950 backdrop-blur-lg overflow-hidden flex flex-col items-center justify-center text-center text-white bg-grid-white/[0.04] relative">
        <div className="my-12 mt-20 md:mt-20">
          <AnimationContainer delay={0.4} className="text-center space-y-4 md:space-y-6 mx-4">
            <button className="group">
              <span className="z-10 text-sm text-neutral-100 flex items-center justify-center gap-1 py-1 px-4 border border-neutral-500 rounded-3xl">
                ✨ Manage Tasks smarter
                <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </span>
            </button>

            <div className="max-w-screen-md mx-auto text-center text-[2.4rem] md:text-7xl">
              <h1 className="leading-[45px] md:leading-[80px] font-semibold font-heading">
                Conquer your tasks with{" "}
                <span className="text-transparent px-2 font-bold font-heading bg-gradient-to-r from-fuchsia-500 to-orange-600 bg-clip-text">
                  Taskster
                </span>
              </h1>
            </div>

            <p className="max-w-screen-sm mx-auto text-lg md:text-xl text-muted-foreground">
              Streamline your workflow and boost productivity with our intuitive and powerful task
              management solution.
            </p>

            <div className="py-6 md:py-8">
              <Button className="group w-3/6 md:w-1/5 font-semibold bg-neutral-100 text-black hover:bg-neutral-300">
                <Link
                  href="/signup"
                  className="flex items-center"
                >
                  Get Started
                  <ArrowRight className="size-4 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </AnimationContainer>

          <AnimationContainer delay={0.6}>
            <HeroImage />
          </AnimationContainer>

          <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-neutral-950 to-transparent z-40"></div>
          <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-neutral-950 to-transparent z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
