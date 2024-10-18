import AnimationContainer from "@/components/animation-container";
import LampDemo from "@/components/ui/lamp";
import React from "react";

const CTASection = () => {
  return (
    <AnimationContainer delay={0.2}>
      <div className="px-1 pt-32">
        <LampDemo />
      </div>
    </AnimationContainer>
  );
};

export default CTASection;
