"use client";

import { useState } from "react";
import type { Project } from "../content/site";
import ItemPane from "./ItemPane";
import { formatMonth } from "./formatMonth";

const SLOT_COUNT = 8;

const slot =
  "aspect-square rounded-slot border-2 border-b-4 border-line bg-inset";

/** Projects as item slots. Hover, focus or a tap selects one and shows it in the pane. */
export default function Inventory({ projects }: { projects: readonly Project[] }) {
  const [selected, setSelected] = useState(0);
  const emptySlots = Math.max(0, SLOT_COUNT - projects.length);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="order-first lg:order-last lg:col-span-5 lg:self-start xl:col-span-4">
        <ItemPane project={projects[selected]} />
      </div>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:col-span-7 xl:col-span-8">
        {projects.map((project, index) => (
          <li key={project.name}>
            <button
              type="button"
              aria-pressed={index === selected}
              onClick={() => setSelected(index)}
              onMouseEnter={() => setSelected(index)}
              onFocus={() => setSelected(index)}
              className={`${slot} flex w-full flex-col justify-between p-3 text-left hover:bg-surface aria-pressed:border-accent`}
            >
              <span className="text-small text-muted">{project.kind}</span>
              <span className="font-display text-lg font-bold leading-tight break-words sm:text-xl">
                {project.name}
              </span>
              <span className="self-end text-small text-muted tabular-nums">
                {project.updated ? formatMonth(project.updated) : ""}
              </span>
            </button>
          </li>
        ))}
        {Array.from({ length: emptySlots }, (_, index) => (
          <li key={`empty-${index}`} aria-hidden="true" className={`${slot} opacity-50`} />
        ))}
      </ul>
    </div>
  );
}
