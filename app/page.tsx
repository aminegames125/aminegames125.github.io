import NavBar from "./components/NavBar";
import Hero from "./components/sections/Hero";
import Work from "./components/sections/Work";
import About from "./components/sections/About";
import Stack from "./components/sections/Stack";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";
import { ScrollProgress } from "./components/ui";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <NavBar />
      <main>
        <Hero />
        <Work />
        <About />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
