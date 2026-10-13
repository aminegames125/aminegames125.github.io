import NavBar from "./components/NavBar";
import Hero from "./components/sections/Hero";
import Bio from "./components/sections/Bio";
import Projects from "./components/sections/Projects";
import Stack from "./components/sections/Stack";
import Vibe from "./components/sections/Vibe";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Bio />
        <Projects />
        <Stack />
        <Vibe />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
