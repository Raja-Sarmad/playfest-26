import Navbar from "@/components/Navbar";
import BackgroundFX from "@/components/BackgroundFX";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Games from "@/components/Games";
import Schedule from "@/components/Schedule";
import Team from "@/components/Team";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <BackgroundFX />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Games />
        <Schedule />
        <Team />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
