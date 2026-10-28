"use client";

import { useRef, useState } from "react";
import type { Project } from "../content/site";
import Breakable from "./Breakable";
import ItemPane from "./ItemPane";
import { formatMonth } from "./formatMonth";
import { gsap, motionOk, ScrollTrigger, useGSAP } from "./motion";

const slot = "aspect-square rounded-slot border-2 border-b-4 border-line bg-inset";

const steps: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

/** Empty slots that square off the last row at each grid width (3 columns, then 4 from `sm`). */
const fill = (count: number, columns: number) => (columns - (count % columns)) % columns;

/**
 * Projects as item slots, a single-select group. A cursor frame glides to the selected slot and
 * the pane follows. Hovering only previews; choosing is a click, a tap, or focus from the keyboard.
 */
export default function Inventory({ projects }: { projects: readonly Project[] }) {
  // Start on a project with a public repository, so the first thing shown has something to open.
  const [selected, setSelected] = useState(() => Math.max(0, projects.findIndex((p) => p.href)));
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);
  const pointerChose = useRef(false);
  const emptyOnPhone = fill(projects.length, 3);
  const emptyOnTablet = fill(projects.length, 4);
  const emptySlots = Math.max(emptyOnPhone, emptyOnTablet);

  /** Reads the selected slot from the DOM, so it is safe to call from any closure. */
  function moveCursor(animate: boolean) {
    const box = cursor.current;
    const target = list.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.parentElement;
    if (!box || !target) return;
    gsap.set(box, { width: target.offsetWidth, height: target.offsetHeight });
    const duration = animate && placed.current && motionOk() ? 0.28 : 0;
    gsap.to(box, { x: target.offsetLeft, y: target.offsetTop, duration, ease: "power3.out", overwrite: "auto" });
    placed.current = true;
  }

  // Items load into their slots the first time the grid scrolls in. The cursor keeps its size on resize.
  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const slots = gsap.utils.toArray<HTMLElement>("[data-slot]", list.current);
        gsap.set(slots, { autoAlpha: 0, y: 16, scale: 0.92 });
        ScrollTrigger.batch(slots, {
          start: "top 90%",
          end: "max",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.06,
              ease: "power3.out",
              overwrite: true,
            }),
        });
      }, root);
      const onResize = contextSafe?.(() => moveCursor(false));
      if (onResize) window.addEventListener("resize", onResize);
      return () => {
        mm.revert();
        if (onResize) window.removeEventListener("resize", onResize);
      };
    },
    { scope: root },
  );

  // Selection changed: glide the cursor, swap the pane's content in, and keep the pane in view on small screens.
  useGSAP(
    () => {
      const swapPane = placed.current;
      moveCursor(true);
      if (!swapPane) return;
      const pane = root.current?.querySelector<HTMLElement>("[data-pane]");
      if (pointerChose.current && pane && !window.matchMedia("(min-width: 64rem)").matches) {
        const { top, bottom } = pane.getBoundingClientRect();
        if (top < 0 || bottom > window.innerHeight) {
          pane.scrollIntoView({ block: "nearest", behavior: motionOk() ? "smooth" : "auto" });
        }
      }
      pointerChose.current = false;
      if (!motionOk()) return;
      gsap.fromTo(
        gsap.utils.toArray("[data-pane] > *", root.current),
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.04, ease: "power3.out", overwrite: true },
      );
    },
    { dependencies: [selected], scope: root },
  );

  function handleKeys(event: React.KeyboardEvent<HTMLUListElement>) {
    const grid = list.current;
    if (!grid) return;
    const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const move = { ...steps, ArrowDown: columns, ArrowUp: -columns }[event.key];
    if (move === undefined) return;
    const target = gsap.utils.clamp(0, projects.length - 1, selected + move);
    if (target === selected) return;
    event.preventDefault();
    grid.querySelectorAll("button")[target]?.focus();
  }

  return (
    <div ref={root} className="grid gap-6 lg:grid-cols-12">
      <div className="relative lg:col-span-7 xl:col-span-8">
        <ul
          ref={list}
          role="radiogroup"
          aria-label="Projects"
          onKeyDown={handleKeys}
          className="grid grid-cols-3 gap-2 sm:grid-cols-4"
        >
          {projects.map((project, index) => (
            <li key={project.name} role="none" data-slot>
              <button
                type="button"
                role="radio"
                aria-checked={index === selected}
                aria-controls="project-pane"
                tabIndex={index === selected ? 0 : -1}
                onClick={() => {
                  pointerChose.current = true;
                  setSelected(index);
                }}
                onFocus={() => setSelected(index)}
                className={`${slot} flex w-full flex-col justify-between border-edge p-2.5 text-left hover:bg-surface aria-checked:bg-surface sm:p-3 md:p-4`}
              >
                <span className="text-small text-muted max-sm:hidden">{project.kind}</span>
                <span className="font-display text-base leading-tight font-bold wrap-break-word sm:text-xl md:text-2xl">
                  <Breakable text={project.name} />
                </span>
                <span className="self-end text-small text-muted tabular-nums">
                  {project.updated ? formatMonth(project.updated) : ""}
                </span>
              </button>
            </li>
          ))}
          {Array.from({ length: emptySlots }, (_, index) => {
            const onPhone = index < emptyOnPhone;
            const onTablet = index < emptyOnTablet;
            const visibility = onPhone && onTablet ? "" : onPhone ? "sm:hidden" : "max-sm:hidden";
            return (
              <li
                key={`empty-${index}`}
                data-slot
                aria-hidden="true"
                className={`${slot} border-line/50 bg-inset/50 ${visibility}`}
              />
            );
          })}
        </ul>
        <span
          ref={cursor}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-10 rounded-slot border-4 border-accent"
        />
      </div>
      <div className="scroll-mb-28 lg:col-span-5 lg:self-start xl:col-span-4">
        <ItemPane project={projects[selected]} slot={selected + 1} total={projects.length} />
      </div>
    </div>
  );
}
