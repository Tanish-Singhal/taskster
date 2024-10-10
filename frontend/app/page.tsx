// import Banner from "./components/Banner";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="bg-neutral-950 overflow-x-hidden scrollbar-hide">
      {/* <Banner /> */}
      <Navbar />
      <Hero />
    </div>
  );
}
