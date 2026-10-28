import { hero, site } from "../content/site";
import MetaLine from "./MetaLine";
export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="hero-fill mx-auto flex max-w-wrap flex-col justify-center gap-10 px-margin py-10 md:gap-14"
    >
      <h1 id="hero-title" className="rise font-display text-display font-bold">
        {hero.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <p className="max-w-xl text-lede text-pretty md:col-span-6">{hero.body}</p>
        <div className="flex flex-col items-start gap-6 md:col-span-5 md:col-start-8">
          {site.availability && (
            <p className="flex items-center gap-3 text-muted">
              <span aria-hidden="true" className="pulse size-2.5 rounded-pill bg-accent" />
              {site.availability}
            </p>
          )}
          <MetaLine />
          <a
            href="#contact"
            className="layer layer-text inline-flex min-h-12 items-center rounded-pill bg-accent px-6 font-semibold text-accent-ink transition-transform duration-(--dur-fast) ease-brand active:scale-97"
          >
            {hero.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
