import { work } from "../content/site";
import Inventory from "./Inventory";

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-wrap px-margin pb-section">
      <h2 id="work-title" className="font-display text-h2 font-bold">
        {work.heading}
      </h2>
      <p className="mt-4 text-muted">{work.intro}</p>
      <div className="mt-10 md:mt-12">
        <Inventory projects={work.projects} />
      </div>
    </section>
  );
}
