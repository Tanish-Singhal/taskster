import React from "react";
import Image from "next/image";
import heroImage from "@/public/heroImage.png";
import { BorderBeam } from "@/components/magicui/border-beam";

const HeroImage = () => {
  return (
    <div className="relative pt-14 pb-20 md:py-20 px-2 bg-transparent w-full">
      <div className="absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]"></div>
      <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
        <Image
          src={heroImage}
          alt="banner image"
          width={1200}
          height={1200}
          quality={100}
          className="rounded-md lg:rounded-xl bg-foreground/10 shadow-2xl"
        />

        <BorderBeam size={400} duration={6} delay={6} />
        <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-neutral-950 to-transparent z-40"></div>
        <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-neutral-950 to-transparent z-50"></div>
      </div>
    </div>
  );
};

export default HeroImage;
