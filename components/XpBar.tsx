"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./motion";

/** A thin XP bar along the top edge that fills as the page is read. */
export default function XpBar() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          bar.current,
          { autoAlpha: 1, scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
          },
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(bar.current, { autoAlpha: 0 });
      });
      return () => mm.revert();
    },
    { scope: bar },
  );

  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="gsap-hide pointer-events-none fixed inset-x-0 top-0 z-20 h-1 bg-accent noscript:hidden"
    />
  );
}
