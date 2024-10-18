// import Banner from "../components/(marketing)/Banner";
import CTASection from "./components/marketing/CTASection";
import Features from "./components/marketing/Features";
import Hero from "./components/marketing/Hero";
import Navbar from "./components/marketing/Navbar";
import Pricing from "./components/marketing/Pricing";
import Testimonials from "./components/marketing/Testimonials";
import Users from "./components/marketing/Users";
import Footer from "./components/marketing/Footer";

export default function Marketing() {
  return (
    <div className="bg-neutral-950 overflow-hidden scrollbar-hide">
      {/* <Banner /> */}
      <Navbar />
      <Hero />
      <Users />
      <Features />
      <Pricing />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
