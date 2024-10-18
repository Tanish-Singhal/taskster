import AnimationContainer from "@/components/animation-container";
import { Button } from "@/components/ui/button";
import MagicBadge from "@/components/ui/magic-badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Pricing = () => {
  return (
    <div id="Pricing">
      <AnimationContainer delay={0.1}>
        <div className="py-24 bg-neutral-950 flex flex-col items-center justify-center text-center text-white">
          <MagicBadge title="Pricing" />

          <h2 className="text-center lg:text-center text-3xl md:text-5xl leading-[1.1] font-medium font-heading text-foreground mt-6 sm:mt-8 text-white">
            Taskster is Completely Free for Everyone!
          </h2>
          <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-screen-md">
            Enjoy full access to all of Taskster&apos;s powerful features at no cost—no hidden fees or
            premium plans! As an open-source, community-driven project, we encourage you to
            contribute and customize Taskster to meet your needs.
          </p>

          <AnimationContainer delay={0.2}>
            <div className="py-10 md:py-12">
              <Button className="group font-semibold bg-neutral-100 text-black hover:bg-neutral-300">
                <Link
                  href="https://github.com/Tanish-Singhal/taskster"
                  target="_blank"
                  className="flex items-center"
                >
                  Github Repository
                  <ArrowRight className="size-4 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </AnimationContainer>
        </div>
      </AnimationContainer>
    </div>
  );
};

export default Pricing;
