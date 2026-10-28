import Hero from "../components/Hero";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
      </main>
      <SiteFooter />
    </>
  );
}
