import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import HeroImage from "./HeroImage";

const Hero = () => {
  return (
    <div>
      <div className="bg-neutral-950 backdrop-blur-lg overflow-hidden flex flex-col items-center justify-center text-center text-white">
        <div className="my-12 mt-20 md:mt-24">
          <div className="text-center space-y-8 mx-4">
            <button>
              <span className="z-10 text-sm text-neutral-100 flex items-center justify-center gap-1 py-1 px-4 border rounded-3xl">
                ✨ Manage Tasks smarter
                <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </span>
            </button>

            <div className="max-w-screen-md mx-auto text-center text-4xl md:text-7xl font-bold">
              <h1 className="leading-[40px] md:leading-[80px] font-semibold">
                Conquer your tasks with{" "}
                <span className="text-transparent px-2 font-bold bg-gradient-to-r from-fuchsia-500 to-orange-600 bg-clip-text">
                  Taskster
                </span>
              </h1>
            </div>

            <p className="max-w-screen-sm mx-auto text-xl text-neutral-400">
              Streamline your workflow and boost productivity with our intuitive and powerful task
              management solution.
            </p>

            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Button asChild variant="secondary" className="w-5/6 md:w-1/4 font-bold">
                <Link href="https://github.com/Tanish-Singhal/taskster" target="_blank">
                Get Started
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="absolute top-0 -z-10 max-w-screen-lg w-full blur-2xl">
              <div className="absolute top-24 left-20 sm:left-40 md:left-60 w-60 h-60 bg-violet-600 rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-3xl"></div>
              <div className="absolute hidden md:block top-24 right-72 w-60 h-60 bg-purple-600 rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-3xl"></div>
              <div className="absolute hidden md:block top-24 right-16 w-60 h-60 bg-pink-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-500 filter blur-3xl"></div>
            </div>

            <HeroImage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
