// import Banner from "./components/Banner";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Users from "./components/Users";

export default function Home() {
  return (
    <div className="bg-neutral-950 overflow-hidden scrollbar-hide">
      {/* <Banner /> */}
      <Navbar />
      <Hero />
      <Users />
      <Features />
      <Pricing />
    </div>
  );
}
