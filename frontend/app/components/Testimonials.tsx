import AnimationContainer from "@/components/animation-container";
import MagicBadge from "@/components/ui/magic-badge";
import React from "react";
import { MarqueeDemo } from "./MarqueeDemo";

const Testimonials = () => {
  return (
    <div id="Testimonials">
      <AnimationContainer delay={0.1}>
        <div className="sm:py-28 py-12 bg-neutral-950 flex flex-col items-center justify-center text-center text-white">
          <MagicBadge title="Testimonials" />

          <h2 className="text-center lg:text-center text-3xl md:text-5xl leading-[1.1] font-medium font-heading text-foreground mt-6 sm:mt-8 text-white">
            What our users are saying
          </h2>
          <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-screen-md">
            Here&apos;s what some of our users have to say about Taskster.
          </p>

          <AnimationContainer delay={0.2}>
            <MarqueeDemo />
          </AnimationContainer>
        </div>
      </AnimationContainer>
    </div>
  );
};

export default Testimonials;
