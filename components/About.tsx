import { about } from "../content/site";

export default function About() {
  const [first, ...rest] = about.paragraphs;

  return (
    <section id="about" aria-label="About" className="mx-auto max-w-wrap px-margin py-section">
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
    </section>
  );
}
