import { work, type Project } from "../content/site";
import Arrow from "./Arrow";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="row group layer -mx-4 grid gap-x-6 gap-y-2 rounded-row px-4 py-7 md:-mx-6 md:grid-cols-12 md:px-6">
      <div className="md:col-span-7">
        <h3 className="font-display text-name font-semibold opacity-85 transition-opacity duration-(--dur-fast) ease-brand group-hover:opacity-100 group-focus-within:opacity-100">
          {project.name}
          {project.live && (
            <span className="ml-3 inline-block rounded-pill bg-accent px-3 py-0.5 align-middle font-body text-small font-semibold tracking-normal text-accent-ink">
              {work.liveLabel}
            </span>
          )}
        </h3>
        <p className="mt-2 max-w-prose text-muted text-pretty">{project.detail}</p>
      </div>
      <p className="text-small text-muted md:col-span-3 md:self-center md:text-body">{project.kind}</p>
      <div className="md:col-span-2 md:self-center md:justify-self-end">
        {project.href && (
          <a
            href={project.href}
            className="inline-flex items-center gap-1 font-semibold after:absolute after:inset-0 after:rounded-row focus-visible:outline-none"
          >
            {work.sourceLabel}
            <Arrow className="size-5 transition-transform duration-(--dur-move) ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </div>
    </li>
  );
}
