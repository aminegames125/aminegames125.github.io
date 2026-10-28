import About from "../components/About";
import Contact from "../components/Contact";
import Hero from "../components/Hero";
import Hotbar from "../components/Hotbar";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import Tools from "../components/Tools";
import Work from "../components/Work";
import XpBar from "../components/XpBar";

export default function Page() {
  return (
    <>
      <XpBar />
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Tools />
        <Contact />
      </main>
      <SiteFooter />
      <Hotbar />
    </>
  );
}
