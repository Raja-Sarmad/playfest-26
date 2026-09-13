import Navbar from "@/components/Navbar";
import BackgroundFX from "@/components/BackgroundFX";
import EarlyBird from "@/components/EarlyBird";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Games from "@/components/Games";
import Gallery from "@/components/Gallery";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <BackgroundFX />
      <EarlyBird />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Games />
        <Gallery />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
