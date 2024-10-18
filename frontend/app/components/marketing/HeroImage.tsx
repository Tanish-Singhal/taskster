import React from "react";
import Image from "next/image";
import heroImage from "@/public/heroImage.png";
import { BorderBeam } from "@/components/ui/border-beam";

const HeroImage = () => {
  return (
    <div className="relative pt-14 pb-20 md:py-20 px-2 bg-transparent w-full">
      <div className="absolute top-8 w-3/4 left-20 right-20 mx-auto h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 -z-10 blur-[6rem]"></div>

      <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
        <Image
          src={heroImage}
          alt="banner image"
          width={1200}
          height={1200}
          quality={100}
          className="rounded-md lg:rounded-xl bg-foreground/10 shadow-2xl"
        />

        <BorderBeam size={350} duration={5} delay={5} />

        <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-neutral-950 to-transparent z-40"></div>
        <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-neutral-950 to-transparent z-50"></div>
      </div>
    </div>
  );
};

export default HeroImage;
