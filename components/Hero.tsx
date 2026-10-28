import { hero, site } from "../content/site";
import HeroMotion from "./HeroMotion";
import MetaLine from "./MetaLine";

export default function Hero() {
  return (
    <HeroMotion className="hero-fill mx-auto flex max-w-wrap flex-col justify-center gap-10 px-margin py-10 md:gap-14">
      <h1 id="hero-title" className="font-display text-display font-bold">
        {hero.lines.map((line) => (
          <span key={line} data-hero-line className="gsap-hide block">
            {line}
          </span>
        ))}
      </h1>
      <div className="grid gap-8 md:grid-cols-12 md:items-start">
        <div className="flex flex-col items-start gap-8 md:col-span-6">
          <p data-hero-item className="gsap-hide max-w-xl text-lede text-pretty">
            {hero.body}
          </p>
          <a
            href="#contact"
            data-hero-item
            className="gsap-hide layer layer-text inline-flex min-h-12 items-center rounded-pill bg-accent px-6 font-semibold text-accent-ink transition-transform duration-(--dur-fast) ease-brand active:scale-97"
          >
            {hero.cta}
          </a>
        </div>
        <div
          data-hero-item
          className="gsap-hide flex flex-col items-start gap-6 rounded-slot border-2 border-b-4 border-line bg-surface p-6 md:col-span-5 md:col-start-8 md:p-8"
        >
          {site.availability && (
            <p className="flex items-center gap-3 text-muted">
              <span aria-hidden="true" className="pulse size-2.5 rounded-pill bg-accent" />
              {site.availability}
            </p>
          )}
          <MetaLine />
        </div>
      </div>
    </HeroMotion>
  );
}
