import About from "../components/About";
import Contact from "../components/Contact";
import Hero from "../components/Hero";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import Tools from "../components/Tools";
import Work from "../components/Work";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Tools />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
