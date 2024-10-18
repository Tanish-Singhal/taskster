import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="group relative top-0 bg-indigo-500 py-2 text-white transition-all duration-300 md:py-0 text-center">
      <div className="flex flex-col items-center justify-center gap-4 md:h-10 md:flex-row">
        <Link
          href="https://github.com/Tanish-Singhal/taskster"
          target="_blank"
          className="inline-flex text-xs leading-normal md:text-sm"
        >
          ✨{" "}
          <span className="ml-1 font-[580] dark:font-[550]">
            {" "}
            Leave a star in Github
          </span>{" "}
          <ChevronRight className="ml-1 size-4 lg:size-5 transition-all duration-300 ease-out group-hover:translate-x-1 inline-block" />
        </Link>
      </div>
    </div>
  );
};

export default Banner;
