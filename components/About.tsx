import { about, site } from "../content/site";

export default function About() {
  const [first, ...rest] = about.paragraphs;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-wrap px-margin py-section"
    >
      <div className="relative rounded-slot border-2 border-b-4 border-line bg-surface px-6 pt-12 pb-8 md:px-10 md:pb-10">
        <h2
          id="about-title"
          className="absolute -top-4 left-6 rounded-tag border-2 border-accent bg-bg px-3 py-0.5 font-display text-base font-bold text-accent md:left-10"
        >
          {site.name}
        </h2>
        <div className="grid gap-6 text-about text-pretty md:grid-cols-12">
          <p className="md:col-span-10 lg:col-span-9">
            <strong className="font-semibold">{about.lead}</strong> {first}
          </p>
          {rest.map((paragraph) => (
            <p key={paragraph} className="text-muted md:col-span-10 lg:col-span-9">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
