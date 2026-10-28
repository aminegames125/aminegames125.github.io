import { work, type Project } from "../content/site";
import Arrow from "./Arrow";
import { formatMonth } from "./formatMonth";

type ItemPaneProps = { project: Project; slot: number; total: number };

export default function ItemPane({ project, slot, total }: ItemPaneProps) {
  return (
    <article
      id="project-pane"
      aria-label={project.name}
      data-pane
      className="min-h-80 rounded-slot border-2 border-b-4 border-line bg-surface p-6 md:p-8 lg:min-h-96"
    >
      <p className="mb-4 text-small text-accent tabular-nums">
        Slot {slot} of {total}
      </p>
      <p className="flex flex-wrap gap-x-4 text-small text-muted">
        <span>{project.kind}</span>
        {project.updated && <time dateTime={project.updated}>{formatMonth(project.updated)}</time>}
      </p>
      <h3 className="mt-3 font-display text-name font-bold wrap-break-word">
        {project.name}
        {project.live && (
          <span className="ml-3 inline-block rounded-pill bg-accent px-3 py-0.5 align-middle font-body text-small font-semibold tracking-normal text-accent-ink">
            {work.liveLabel}
          </span>
        )}
      </h3>
      <p className="mt-4 text-pretty">{project.detail}</p>
      {project.href && (
        <a
          href={project.href}
          className="layer layer-text mt-6 inline-flex min-h-12 items-center gap-1 rounded-pill bg-accent px-6 font-semibold text-accent-ink transition-transform duration-(--dur-fast) ease-brand active:scale-97"
        >
          {work.sourceLabel}
          <Arrow className="size-5" />
        </a>
      )}
    </article>
  );
}
