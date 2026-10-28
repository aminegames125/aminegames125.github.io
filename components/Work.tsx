import { work } from "../content/site";
import ProjectRow from "./ProjectRow";

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-wrap px-margin pb-section">
      <h2 id="work-title" className="font-display text-h2 font-bold">
        {work.heading}
      </h2>
      <p className="mt-4 text-muted">{work.intro}</p>
      <ul className="mt-10 md:mt-12">
        {work.projects.map((project) => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </ul>
    </section>
  );
}
