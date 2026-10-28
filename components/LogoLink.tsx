"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, motionOk, useGSAP } from "./motion";

/** The mark is a 5 by 5 grid of blocks drawn as an A. The middle of the crossbar is the lit one. */
const CELLS = [
  [0, 1], [0, 2], [0, 3],
  [1, 0], [1, 4],
  [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
  [3, 0], [3, 4],
  [4, 0], [4, 4],
] as const;
const LIT = "2,2";
const SIZE = 44;
const STEP = 48;
const MARGIN = 10;

const place = (index: number) => MARGIN + index * STEP;

/**
 * The header logo. On load the blocks build the A from the ground up and the lit block lands last
 * with a ring, like an item arriving in a slot. Hovering or focusing it sends a ripple out from the
 * lit block. Reduced motion gets the static mark.
 */
export default function LogoLink({ name }: { name: string }) {
  const link = useRef<HTMLAnchorElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const svg = link.current?.querySelector("svg");
        const blocks = gsap.utils.toArray<SVGRectElement>("[data-block]", link.current);
        const lit = blocks.find((block) => block.dataset.block === LIT);
        const ring = link.current?.querySelector<SVGRectElement>("[data-ring]");
        if (!svg || !lit || !ring) return;

        const rest = blocks
          .filter((block) => block !== lit)
          .sort((a, b) => Number(b.dataset.row) - Number(a.dataset.row));
        let ready = false;

        gsap.set(blocks, { scale: 0, autoAlpha: 0, transformOrigin: "50% 50%" });
        gsap.set(ring, { autoAlpha: 0, transformOrigin: "50% 50%" });
        gsap.set(svg, { autoAlpha: 1 });

        gsap
          .timeline({ delay: 0.15, onComplete: () => (ready = true) })
          .to(rest, { scale: 1, autoAlpha: 1, duration: 0.45, ease: "back.out(1.6)", stagger: 0.05 })
          .to(lit, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(2.4)" }, ">-0.1")
          .fromTo(
            ring,
            { autoAlpha: 0.9, scale: 1 },
            { autoAlpha: 0, scale: 2.6, duration: 0.9, ease: "expo.out" },
            "<0.1",
          );

        const ripple = contextSafe?.(() => {
          if (!ready || !motionOk()) return;
          gsap.to(blocks, {
            scale: 0.8,
            duration: 0.14,
            ease: "power2.out",
            stagger: { each: 0.02, from: blocks.indexOf(lit) },
            yoyo: true,
            repeat: 1,
            overwrite: "auto",
          });
        });
        if (!ripple) return;
        const node = link.current;
        node?.addEventListener("pointerenter", ripple);
        node?.addEventListener("focus", ripple);
        return () => {
          node?.removeEventListener("pointerenter", ripple);
          node?.removeEventListener("focus", ripple);
        };
      });
      return () => mm.revert();
    },
    { scope: link },
  );

  return (
    <Link ref={link} href="/" className="flex items-center gap-3 font-display text-xl font-bold tracking-brand">
      <svg viewBox="0 0 256 256" aria-hidden="true" className="gsap-hide size-8 overflow-visible">
        {CELLS.map(([row, col]) => {
          const key = `${row},${col}`;
          return (
            <rect
              key={key}
              data-block={key}
              data-row={row}
              x={place(col)}
              y={place(row)}
              width={SIZE}
              height={SIZE}
              rx={9}
              className={key === LIT ? "fill-accent" : "fill-text"}
            />
          );
        })}
        <rect
          data-ring
          x={place(2)}
          y={place(2)}
          width={SIZE}
          height={SIZE}
          rx={9}
          opacity={0}
          className="fill-none stroke-accent stroke-[3]"
        />
      </svg>
      {name}
    </Link>
  );
}
