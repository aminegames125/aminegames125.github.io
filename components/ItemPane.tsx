import { work, type Project } from "../content/site";
import Arrow from "./Arrow";
import { formatMonth } from "./formatMonth";

export default function ItemPane({ project }: { project: Project }) {
  return (
    <article
      aria-label={project.name}
      className="rounded-slot border-2 border-b-4 border-line bg-surface p-6 md:p-8 lg:min-h-96"
    >
      <p className="text-small text-muted">
        {project.kind}
        {project.updated && (
          <>
            {" · "}
            <time dateTime={project.updated}>{formatMonth(project.updated)}</time>
          </>
        )}
      </p>
      <h3 className="mt-3 font-display text-name font-bold break-words">
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
