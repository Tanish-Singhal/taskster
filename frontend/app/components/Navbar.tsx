"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/taskster-high-resolution-logo-transparent-copy.png";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const routeList = [
  { href: "#", label: "Features" },
  { href: "#", label: "Price" },
  { href: "#", label: "Help" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-neutral-950 backdrop-blur-lg px-4 sm:px-10 lg:px-32">
      <div className="py-4 flex items-center justify-between">
        <Link href="/" className="relative text-white font-semibold text-3xl">
          <Image src={logo} alt="logo" width={150} height={150} />
        </Link>

        <div className="flex items-center lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button className="flex items-center">
                <Menu className="cursor-pointer w-8 h-8 text-white" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-screen bg-neutral-950 text-white p-4 transition-transform duration-300 ease-in-out flex flex-col justify-between"
            >
              <div>
                <SheetClose
                  asChild
                  className="absolute top-3 right-5 bg-background z-20 flex items-center justify-center"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-neutral-600 hover:bg-neutral-800 rounded-full transition"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </SheetClose>

                <SheetHeader className="flex flex-col items-start mb-6">
                  <SheetTitle className="flex items-center mb-4">
                    <Image src={logo} alt="logo" width={120} height={120} />
                  </SheetTitle>
                  <Separator />
                </SheetHeader>

                <ul className="flex flex-col items-start w-full mt-4">
                  {routeList.map(({ href, label }) => (
                    <Button
                      key={href}
                      onClick={() => setIsOpen(false)}
                      asChild
                      variant="ghost"
                      className="justify-start text-base mb-2 rounded-md hover:bg-neutral-800 transition"
                    >
                      <Link href={href}>{label}</Link>
                    </Button>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center w-full mt-4">
                <Separator className="my-4" />
                <div className="flex items-center justify-center w-full space-x-2">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-neutral-800 transition rounded-md"
                  >
                    <Link
                      aria-label="Sign In"
                      href="https://github.com/nobruf/shadcn-landing-page.git"
                      target="_blank"
                    >
                      Sign In
                    </Link>
                  </Button>
                  <Button className="text-black bg-neutral-200 hover:bg-neutral-800 transition rounded-md">
                    <Link
                      aria-label="Get Started"
                      href="https://github.com/Tanish-Singhal/taskster"
                      target="_blank"
                      className="flex items-center gap-1 hover:text-white"
                    >
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden lg:flex text-neutral-400 gap-6 items-center">
          {routeList.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-opacity-60 hover:text-opacity-100 hover:text-white transition"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex gap-2">
          <Button variant="ghost" className="text-white">
            <Link
              aria-label="Sign In"
              href="https://github.com/nobruf/shadcn-landing-page.git"
              target="_blank"
            >
              Sign In
            </Link>
          </Button>
          <Button className="text-black bg-neutral-200 hover:bg-neutral-800">
            <Link
              aria-label="Get Started"
              href="https://github.com/Tanish-Singhal/taskster"
              target="_blank"
              className="flex items-center gap-1 hover:text-white"
            >
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
