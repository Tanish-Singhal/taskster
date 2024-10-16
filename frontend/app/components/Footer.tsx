import Link from "next/link";
import AnimationContainer from "@/components/animation-container";
import Logo from "@/public/taskster-logo.png";
import Image from "next/image";

const Footer = () => {
  const links = {
    product: [
      { href: "#Features", label: "Features" },
      { href: "#Pricing", label: "Pricing" },
      { href: "#Testimonials", label: "Testimonials" },
      { href: "#Home", label: "Home" },
    ],
    integrations: [
      { href: "https://tanish-singhal.vercel.app", label: "Portfolio" },
      { href: "https://twitter.com/TanishSing44334", label: "Twitter" },
      { href: "https://discord.com/users/tanish_002/", label: "Discord" },
      { href: "https://www.linkedin.com/in/tanishsinghal1", label: "LinkedIn" },
    ],
    resources: [
      { href: "https://tanish-singhal.vercel.app", label: "Blog" },
      { href: "https://tanish-singhal.vercel.app", label: "Support" },
    ],
    company: [
      { href: "#Home", label: "About Us" },
      { href: "", label: "Privacy Policy" },
      { href: "", label: "Terms & Conditions" },
    ],
  };

  return (
    <footer className="flex flex-col relative items-center justify-center border-t border-neutral-700 pt-16 pb-8 md:pb-0 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] mb-8">
      <div className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-white rounded-full"></div>

      <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
        <AnimationContainer delay={0.1}>
          <div className="flex flex-col items-start justify-start md:max-w-[200px]">
            <div className="flex items-start">
              <Image src={Logo} className="w-10 h-10" alt="Taskster Logo" />
            </div>
            <p className="text-neutral-500 mt-4 text-sm text-start">
              Manage your Tasks with ease.
            </p>
            <span className="mt-4 text-neutral-200 text-sm flex items-center">
              Made by{" "}
              <Link href="https://tanish-singhal.vercel.app/" className="font-semibold ml-1">
                Tanish
              </Link>
            </span>
          </div>
        </AnimationContainer>

        <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <AnimationContainer delay={0.2}>
              <div>
                <h3 className="text-base font-medium text-white">Product</h3>
                <ul className="mt-4 text-sm text-muted-foreground">
                  {links.product.map((item, idx) => (
                    <li className="mt-2" key={idx}>
                      <Link href={item.href} className="hover:text-neutral-300 text-neutral-500 transition-all duration-300">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimationContainer>
            <AnimationContainer delay={0.3}>
              <div className="mt-10 md:mt-0 flex flex-col">
                <h3 className="text-base font-medium text-white">Integrations</h3>
                <ul className="mt-4 text-sm text-muted-foreground">
                  {links.integrations.map((item, idx) => (
                    <li className="mt-2" key={idx}>
                      <Link href={item.href} className="hover:text-neutral-300 text-neutral-500 transition-all duration-300">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimationContainer>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <AnimationContainer delay={0.4}>
              <div>
                <h3 className="text-base font-medium text-white">Resources</h3>
                <ul className="mt-4 text-sm text-muted-foreground">
                  {links.resources.map((item, idx) => (
                    <li className="mt-2" key={idx}>
                      <Link href={item.href} className="hover:text-neutral-300 text-neutral-500 transition-all duration-300">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimationContainer>
            <AnimationContainer delay={0.5}>
              <div className="mt-10 md:mt-0 flex flex-col">
                <h3 className="text-base font-medium text-white">Company</h3>
                <ul className="mt-4 text-sm text-muted-foreground">
                  {links.company.map((item, idx) => (
                    <li className="mt-2" key={idx}>
                      <Link href={item.href} className="hover:text-neutral-300 text-neutral-500 transition-all duration-300">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimationContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-neutral-800 pt-4 md:pt-8 md:flex md:items-center md:justify-between w-full">
        <AnimationContainer delay={0.6}>
          <p className="text-sm text-muted-foreground mt-8 md:mt-0">
            &copy; {new Date().getFullYear()} Taskster INC. All rights reserved.
          </p>
        </AnimationContainer>
      </div>
    </footer>
  );
};

export default Footer;
