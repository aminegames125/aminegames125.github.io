"use client";

import { useRef, useState } from "react";
import type { Project } from "../content/site";
import Breakable from "./Breakable";
import ItemPane from "./ItemPane";
import { formatMonth } from "./formatMonth";

const SLOT_COUNT = 8;

const slot = "aspect-square rounded-slot border-2 border-b-4 border-line bg-inset";

const steps: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

/** Projects as item slots. Hover, focus or a tap selects one and shows it in the pane. */
export default function Inventory({ projects }: { projects: readonly Project[] }) {
  const [selected, setSelected] = useState(0);
  const list = useRef<HTMLUListElement>(null);
  const emptySlots = Math.max(0, SLOT_COUNT - projects.length);

  function handleKeys(event: React.KeyboardEvent<HTMLUListElement>) {
    const grid = list.current;
    if (!grid) return;
    const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const move = { ...steps, ArrowDown: columns, ArrowUp: -columns }[event.key];
    if (move === undefined) return;
    const target = selected + move;
    if (target < 0 || target >= projects.length) return;
    event.preventDefault();
    grid.querySelectorAll("button")[target]?.focus();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="order-first lg:order-last lg:col-span-5 lg:self-start xl:col-span-4">
        <ItemPane project={projects[selected]} slot={selected + 1} total={projects.length} />
      </div>
      <ul
        ref={list}
        onKeyDown={handleKeys}
        className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:col-span-7 xl:col-span-8"
      >
        {projects.map((project, index) => (
          <li key={project.name} className="pop">
            <button
              type="button"
              aria-pressed={index === selected}
              onClick={() => setSelected(index)}
              onMouseEnter={() => setSelected(index)}
              onFocus={() => setSelected(index)}
              className={`${slot} flex w-full flex-col justify-between p-3 text-left transition-transform duration-(--dur-fast) ease-brand hover:bg-surface aria-pressed:-translate-y-0.5 aria-pressed:border-accent aria-pressed:bg-surface md:p-4`}
            >
              <span className="text-small text-muted">{project.kind}</span>
              <span className="font-display text-xl leading-tight font-bold wrap-break-word md:text-2xl">
                <Breakable text={project.name} />
              </span>
              <span className="self-end text-small text-muted tabular-nums">
                {project.updated ? formatMonth(project.updated) : ""}
              </span>
            </button>
          </li>
        ))}
        {Array.from({ length: emptySlots }, (_, index) => (
          <li key={`empty-${index}`} aria-hidden="true" className={`${slot} pop opacity-50`} />
        ))}
      </ul>
    </div>
  );
}
