import { work } from "../content/site";
import Inventory from "./Inventory";
import Reveal from "./Reveal";

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-wrap px-margin pb-section">
      <Reveal>
        <h2 id="work-title" data-reveal className="font-display text-h2 font-bold">
          {work.heading}
        </h2>
        <p data-reveal className="mt-4 text-muted">
          {work.intro}
        </p>
      </Reveal>
      <div className="mt-10 md:mt-12">
        <Inventory projects={work.projects} />
      </div>
    </section>
  );
}
