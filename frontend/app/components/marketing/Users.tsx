import React from "react";
import Image from "next/image";
import AmazonLogo from "@/public/icons8-amazon.svg";
import AppleLogo from "@/public/icons8-apple.svg";
import MetaLogo from "@/public/META.D.svg";
import NetflixLogo from "@/public/icons8-netflix.svg";
import MicrosoftLogo from "@/public/icons8-microsoft.svg";
import NvidiaLogo from "@/public/icons8-nvidia.svg";
import AnimationContainer from "@/components/animation-container";

const COMPANIES = [
  {
    name: "Nvidia",
    logo: NvidiaLogo,
  },
  {
    name: "Microsoft",
    logo: MicrosoftLogo,
  },
  {
    name: "Apple",
    logo: AppleLogo,
  },
  {
    name: "Netflix",
    logo: NetflixLogo,
  },
  {
    name: "Amazon",
    logo: AmazonLogo,
  },
  {
    name: "Meta",
    logo: MetaLogo,  
  }
];

const Users = () => {
  return (
    <div className="pt-6 md:pt-8 pb-14 md:pb-20">
      <AnimationContainer delay={0.1}>
        <div className="mx-auto px-4 md:px-24">
          <h2 className="text-center text-sm md:text-md font-medium font-heading text-muted-foreground uppercase">
            Trusted by the best in the industry
          </h2>
          <div className="mt-8 mx-auto">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-6 md:gap-x-16 justify-center">
              {COMPANIES.map((company) => (
                <li
                  key={company.name}
                  className="flex gap-2 text-xl font-normal text-neutral-200 items-center"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={33}
                    height={33}
                    quality={100}
                    className="w-9 h-9 sm:w-12 sm:h-12"
                  />
                  <p className="text-sm md:text-xl">{company.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimationContainer>
    </div>
  );
};

export default Users;
